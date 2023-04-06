const SUPER_USER_PASSWORD = import.meta.env.SUPER_USER_PASSWORD || '';
const ANONYMOUS_USER_PASSWORD = import.meta.env.ANONYMOUS_USER_PASSWORD || '';

const anonymousUsers: string[] = ANONYMOUS_USER_PASSWORD
  ? ANONYMOUS_USER_PASSWORD.split(',')
  : [];

const superUsers: string[] = SUPER_USER_PASSWORD
  ? SUPER_USER_PASSWORD.split(',')
  : [];

/**
 * 如果不设置密码，首页是可以进入的
 *
 * @param pass - 密码
 * @returns 返回 true 也可能是没密码
 */
export function isLoggedIn(pass: string) {
  return anonymousUsers.length === 0 || anonymousUsers.includes(pass);
}

export function isSuperUser(pass: string) {
  return superUsers.length > 0 && superUsers.includes(pass);
}

/**
 * 检查密码是否正确
 */
export function checkPass(pass: string) {
  return isLoggedIn(pass) || isSuperUser(pass);
}
