import { useMemo, useEffect } from 'react';

import Vditor from 'vditor';
import 'vditor/dist/index.css';

const defaultToolbar = [
  'outline',
  'undo',
  'redo',
  '|',
  'emoji',
  'headings',
  'bold',
  'italic',
  'strike',
  '|',
  'line',
  'list',
  'ordered-list',
  'link',
  '|',
  'table',
  'check',
  'code',
  '|',
  'code-theme',
  'content-theme',
  'fullscreen',
  'preview',
  '|',
  'export',
  'help',
];

export type RichEditorProps = {
  id: string;
  toolbar?: string[];
  value: string;
  placeholder?: string;
  className?: string;
  onChange?: (content: string) => void;
};

export default function RichEditor({
  id,
  value = '',
  toolbar = defaultToolbar,
  placeholder = '请输入内容',
  className,
  onChange,
}: RichEditorProps) {
  const config = useMemo(
    () => ({
      value,
      toolbar,
      placeholder,
    }),
    [value, toolbar, placeholder]
  );

  useEffect(() => {
    const editor = new Vditor(`vditor-${id}`, {
      ...config,
      width: '100%',
      height: '100%',
      cache: {
        enable: false,
      },
      outline: {
        enable: true,
        position: 'left',
      },
      input: onChange,
    });

    return () => {
      // hack 解决 Vditor 无法销毁的问题
      const element = editor?.vditor?.element;
      if (element) editor.destroy();
    };
  }, [id, config]);

  return <div id={`vditor-${id}`} className={className} key={id}></div>;
}
