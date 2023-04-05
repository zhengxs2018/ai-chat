export const saveToFile = async (
  filename: string,
  content: Blob | MediaSource
) => {
  const elem = document.createElement('a');
  const url = URL.createObjectURL(content);

  elem.href = url;
  elem.download = filename;

  document.body.appendChild(elem);
  elem.click();

  setTimeout(() => {
    document.body.removeChild(elem);
    window.URL.revokeObjectURL(url);
  }, 0);
};

export function saveFileAsJSON(filename: string, parts?: BlobPart[]) {
  saveToFile(filename, new Blob(parts, { type: 'text/json' }));
}

export const saveMarkdownToFile = (
  title: string,
  messages: Record<'role' | 'content', string>[]
) => {
  const markdown: string[] = [`# ${title}', '\n\n`];

  messages.forEach((item) => {
    markdown.push(`## ${item.role}`, '\n\n', item.content, '\n\n');
  });

  saveToFile(
    `${title || 'chat'}.md`,
    new Blob(markdown, { type: 'text/markdown' })
  );
};
