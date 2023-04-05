import { useEffect, useState } from 'react';

function minmax(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

// hack 临时方案
export function useCursor(data: unknown[]) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(data.length);

  function set(i: number) {
    if (index === i) return;
    setIndex(minmax(i, 0, length - 1));
  }

  function prev() {
    if (index > 0) set(index - 1);
  }

  function next() {
    if (index < length - 1) set(index + 1);
  }

  useEffect(() => {
    if (length === data.length) return;
    setLength(data.length);
  }, [length, data]);

  return {
    index,
    prev,
    next,
    set,
  };
}
