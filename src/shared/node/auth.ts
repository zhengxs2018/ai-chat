import type { AstroCookies } from 'astro';

const { ANONYMOUS_USER_PASSWORD } = process.env;

const passwords: string[] = ANONYMOUS_USER_PASSWORD
  ? ANONYMOUS_USER_PASSWORD.split(',')
  : [];

export function checkAuthPass(pass?: string) {
  if (passwords.length === 0) return true;
  return pass && passwords.includes(pass);
}

export function checkAuthFromCookies(cookies: AstroCookies) {
  return checkAuthPass(cookies.get('code').value);
}
