export function removeLeadingSlash(path: string) {
  return path.startsWith('/') ? path.slice(1) : path;
}

export function removeTrailingSlash(path: string) {
  return path.endsWith('/') ? path.slice(0, -1) : path;
}
