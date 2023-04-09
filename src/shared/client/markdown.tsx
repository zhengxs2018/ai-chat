import MarkdownIt from 'markdown-it';

import highlight from 'markdown-it-highlightjs';
import 'highlight.js/styles/atom-one-light.css';

import katex from 'markdown-it-katex';
import 'katex/dist/katex.min.css';

const md = MarkdownIt({
  linkify: true,
  breaks: true,
});

md.use(katex);
md.use(highlight);

export default md;
