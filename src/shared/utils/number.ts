const NUM = /(\d)(?=(\d\d\d)+(?!\d))/g;

export function humanize(n: string, delimiter = ',', separator = '.'): string {
  const [a, b] = n.toString().split('.');
  const c = a.replace(NUM, `$1${delimiter}`);
  return `${c}${b ? separator + b : ''}`;
}
