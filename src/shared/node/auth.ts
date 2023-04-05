import type { AstroCookies } from 'astro';

const SUPER_USER_PASSWORD = import.meta.env.SUPER_USER_PASSWORD || '';
const ANONYMOUS_USER_PASSWORD = import.meta.env.ANONYMOUS_USER_PASSWORD || '';

const anonymousPasswords: string[] = ANONYMOUS_USER_PASSWORD
  ? ANONYMOUS_USER_PASSWORD.split(',')
  : [];

const superPasswords: string[] = SUPER_USER_PASSWORD
  ? SUPER_USER_PASSWORD.split(',')
  : [];

export function checkAuthPass(pass?: string) {
  if (anonymousPasswords.length === 0) return true;
  return pass && anonymousPasswords.includes(pass);
}

export function checkAuthFromCookies(cookies: AstroCookies) {
  return checkAuthPass(cookies.get('code').value);
}

export function isSuperUser(pass: string) {
  return superPasswords.length > 0 && superPasswords.includes(pass);
}
