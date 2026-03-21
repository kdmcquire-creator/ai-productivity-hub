// Subscriber management — flat-file pattern
// In production, consider upgrading to Cloudflare KV for scale

export interface Subscriber {
  email: string;
  subscribedAt: string;
  source: string; // Where they signed up (homepage, blog, tool-page, footer)
  status: "active" | "unsubscribed";
  unsubscribedAt?: string;
}

// Simple email validation
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Generate unsubscribe token (simple HMAC-like approach)
// In production, use a proper HMAC with a secret key
export function generateUnsubscribeToken(
  email: string,
  secret: string
): string {
  // Simple hash for unsubscribe links
  let hash = 0;
  const str = `${email}:${secret}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}
