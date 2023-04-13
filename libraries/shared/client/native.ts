export function openInNewWindow(
  url?: string | URL,
  target?: string,
  width = 375,
  height = 667,
  features = 'noopener,noreferrer,scrollbars=yes,resizable=yes,toolbar=no,location=no,menubar=no'
) {
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;
  const location = `width=${width},height=${height},left=${left},top=${top}`;

  window.open(url, target, `${location}${features ? `,${features}` : ''}`);
}
