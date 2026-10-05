'use client';

import React, { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Message {
  id: string;
  from: 'user' | 'agent';
  text: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    from: 'agent',
    text: 'Hi! Welcome to KeiTruckNation. How can I help you today?',
    time: 'Just now',
  },
];

const QUICK_REPLIES = [
  'What trucks are available?',
  'How does shipping work?',
  'Do you offer financing?',
  'VIN / Chassis lookup help',
];

const AUTO_REPLIES: Record<string, string> = {
  default:
    'Thanks for reaching out! Our team typically responds within a few minutes. In the meantime, feel free to browse our inventory or check our FAQ page.',
  shipping:
    'We ship to all 48 contiguous US states and internationally. Shipping typically takes 4–8 weeks from Japan. Visit our Shipping page for full details.',
  financing:
    'Yes! We offer flexible financing options. Visit our Financing page or call us to discuss your options.',
  trucks:
    'We carry 7 categories of kei trucks including flatbeds, dump trucks, vans, crew cabs, and specialty rigs. Browse our full inventory at /inventory.',
  vin: 'Our VIN/Chassis Lookup tool can help you decode Japanese auction chassis numbers. Visit /vin-lookup for the full tool.',
};

function getAutoReply(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('ship')) return AUTO_REPLIES.shipping;
  if (lower.includes('financ') || lower.includes('loan')) return AUTO_REPLIES.financing;
  if (lower.includes('truck') || lower.includes('available') || lower.includes('inventory'))
    return AUTO_REPLIES.trucks;
  if (lower.includes('vin') || lower.includes('chassis')) return AUTO_REPLIES.vin;
  return AUTO_REPLIES.default;
}

function getTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && !minimized) {
      setUnread(0);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, minimized, messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      from: 'user',
      text: text.trim(),
      time: getTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        from: 'agent',
        text: getAutoReply(text),
        time: getTime(),
      };
      setMessages((prev) => [...prev, reply]);
      if (!open || minimized) setUnread((n) => n + 1);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div
          className={`fixed bottom-24 right-4 sm:right-6 z-[200] w-[calc(100vw-2rem)] sm:w-[380px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
            minimized ? 'h-14' : 'h-[480px] sm:h-[520px]'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Live chat"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-secondary border-b border-border flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="size-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Icon name="ChatBubbleLeftRightIcon" size={16} className="text-primary" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 rounded-full border-2 border-card" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">KeiTruckNation Support</p>
                <p className="text-xs text-green-400 font-medium">● Online now</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized(!minimized)}
                className="size-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label={minimized ? 'Expand chat' : 'Minimize chat'}
              >
                <Icon name={minimized ? 'ChevronUpIcon' : 'MinusIcon'} size={16} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="size-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close chat"
              >
                <Icon name="XMarkIcon" size={16} />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scroll-smooth">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {msg.from === 'agent' && (
                      <div className="size-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon name="TruckIcon" size={12} className="text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                        msg.from === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-sm'
                          : 'bg-muted text-foreground rounded-tl-sm'
                      }`}
                    >
                      {msg.text}
                      <p
                        className={`text-[10px] mt-1 ${msg.from === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex gap-2">
                    <div className="size-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <Icon name="TruckIcon" size={12} className="text-primary" />
                    </div>
                    <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                      <span
                        className="size-1.5 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      />
                      <span
                        className="size-1.5 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      />
                      <span
                        className="size-1.5 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide flex-shrink-0">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => sendMessage(qr)}
                    className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors whitespace-nowrap"
                  >
                    {qr}
                  </button>
                ))}
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 px-4 py-3 border-t border-border flex-shrink-0"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-input border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[40px]"
                  aria-label="Chat message input"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="size-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:scale-105 transition-transform disabled:opacity-40 disabled:scale-100 flex-shrink-0"
                  aria-label="Send message"
                >
                  <Icon name="PaperAirplaneIcon" size={16} />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => {
          setOpen(!open);
          setUnread(0);
        }}
        className="fixed bottom-6 right-4 sm:right-6 z-[200] size-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform glow-lime"
        aria-label={open ? 'Close chat' : 'Open live chat'}
      >
        {open ? (
          <Icon name="XMarkIcon" size={22} />
        ) : (
          <Icon name="ChatBubbleLeftRightIcon" size={22} />
        )}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 size-5 bg-accent text-white text-[10px] font-black rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>
    </>
  );
}
