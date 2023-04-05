import 'highlight.js/styles/atom-one-light.css';
import 'katex/dist/katex.min.css';
import MarkdownIt from 'markdown-it';
import mdHighlight from 'markdown-it-highlightjs';
import mdKatex from 'markdown-it-katex';

const md = MarkdownIt({
  linkify: true,
  breaks: true,
});

md.use(mdKatex);

md.use(mdHighlight);

export default md;
