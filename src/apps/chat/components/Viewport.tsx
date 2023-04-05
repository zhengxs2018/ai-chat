import ChatView from './ChatView';
import CompletionView from './CompletionView';
import NotFoundView from './NotFoundView';

export type ViewportProps = {
  viewName: string;
};

export default function Viewport({ viewName }: ViewportProps) {
  switch (viewName) {
    case 'chat':
      return <ChatView></ChatView>;
    case 'complete':
      return <CompletionView></CompletionView>;
    default:
      return <NotFoundView></NotFoundView>;
  }
}
