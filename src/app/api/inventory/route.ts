import { NextResponse } from 'next/server';
import { INVENTORY, getTrucksByCategory, getTrucksByMake, searchInventory } from '@/lib/inventory';
import { rateLimit, getClientIp, RATE_LIMITS } from '@/lib/rateLimit';

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const rl = rateLimit(`inventory:${ip}`, RATE_LIMITS.api);

  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter: rl.retryAfter },
      {
        status: 429,
        headers: {
          'Retry-After': String(rl.retryAfter ?? 60),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rl.resetAt),
        },
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const make = searchParams.get('make');
  const query = searchParams.get('q');
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');

  let results = INVENTORY;

  if (id) {
    const truck = INVENTORY.find((t) => t.id === id);
    if (!truck) {
      return NextResponse.json({ error: 'Truck not found' }, { status: 404 });
    }
    return NextResponse.json(
      { truck },
      { headers: { 'X-RateLimit-Remaining': String(rl.remaining) } }
    );
  }

  if (slug) {
    const truck = INVENTORY.find((t) => t.slug === slug);
    if (!truck) {
      return NextResponse.json({ error: 'Truck not found' }, { status: 404 });
    }
    return NextResponse.json(
      { truck },
      { headers: { 'X-RateLimit-Remaining': String(rl.remaining) } }
    );
  }

  if (query) {
    results = searchInventory(query);
  } else if (category) {
    results = getTrucksByCategory(category as Parameters<typeof getTrucksByCategory>[0]);
  } else if (make) {
    results = getTrucksByMake(make);
  }

  return NextResponse.json(
    { trucks: results, total: results.length },
    { headers: { 'X-RateLimit-Remaining': String(rl.remaining) } }
  );
}
