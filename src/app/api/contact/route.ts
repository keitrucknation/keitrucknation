import { NextResponse } from 'next/server';
import { rateLimit, getClientIp, RATE_LIMITS } from '@/lib/rateLimit';

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  inquiryType?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '').trim().slice(0, 2000);
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = rateLimit(`contact:${ip}`, RATE_LIMITS.form);

  if (!rl.success) {
    return NextResponse.json(
      {
        error: 'Too many submissions. Please wait before trying again.',
        retryAfter: rl.retryAfter,
      },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } }
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'name, email, and message are required' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  // Sanitize inputs
  const safe = {
    name: sanitize(name),
    email: sanitize(email),
    phone: body.phone ? sanitize(body.phone) : undefined,
    inquiryType: body.inquiryType ? sanitize(body.inquiryType) : 'general',
    message: sanitize(message),
  };

  // In production, send to email service / CRM here.
  // For now, log server-side and return success.
  console.info('[Contact Form]', { ...safe, ip, timestamp: new Date().toISOString() });

  return NextResponse.json(
    { success: true, message: "Message received. We'll be in touch within 24 hours." },
    { headers: { 'X-RateLimit-Remaining': String(rl.remaining) } }
  );
}
