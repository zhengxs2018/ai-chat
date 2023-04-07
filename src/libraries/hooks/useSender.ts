/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

/**
 * 发送状态
 *
 * - idle - 空闲
 * - sending - 正在发送
 * - waiting - 等待响应或响应中
 * - error - 发送或响应失败
 */
export type SentStatus = 'idle' | 'sending' | 'waiting';

export type SenderOptions = {
  /**
   * 转换响应
   */
  transformResponse?: (response: any) => any;
};

/**
 * TODO 支持队列请求
 * TODO 支持流式响应
 */
export function useSender() {
  const [sending, setSending] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  function abortRequest() {
    if (sending || waiting) {
      setSending(false);
      setWaiting(false);
    }

    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
  }

  async function withRequest(fetcher: (signal: AbortSignal) => Promise<any>) {
    setSending(true);
    setWaiting(true);

    try {
      const abort = new AbortController();

      const response = await fetcher(abort.signal);

      setSending(false);
      setWaiting(false);

      return response;
    } finally {
      setSending(false);
      setWaiting(false);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => abortRequest(), []);

  return {
    sending,
    waiting,
    withRequest,
    abortRequest,
  };
}
