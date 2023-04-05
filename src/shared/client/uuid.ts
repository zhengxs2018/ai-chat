/* eslint-disable no-bitwise */
/** @internal */
interface CryptoWindow extends Window {
  msCrypto?: Crypto;
}

/** @internal */
const crypto =
  typeof window !== 'undefined'
    ? window.crypto || (window as CryptoWindow).msCrypto
    : null;

/** @internal */
const hasCrypto = crypto && crypto !== null;

/** @internal */
const hasRandomValues =
  hasCrypto && typeof crypto.getRandomValues !== 'undefined';

/** @internal */
function getRandomValuesWithCrypto(c: number): string {
  return (
    c ^
    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
  ).toString(16);
}

/** @internal */
function getRandomValues(c: number): string {
  return (c ^ ((Math.random() * 16) >> (c / 4))).toString(16);
}

/** @internal */
const randomValues = hasRandomValues
  ? getRandomValuesWithCrypto
  : getRandomValues;

/** @internal */
export function uuid(): string {
  return [
    randomValues(10000000),
    randomValues(1000),
    randomValues(8000),
    randomValues(100000000000),
  ].join('-');
}
