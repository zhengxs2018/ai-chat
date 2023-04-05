import CompletionView from './CompletionView';

export type ViewportProps = {
  viewName: string;
};

export default function Viewport({ viewName }: ViewportProps) {
  switch (viewName) {
    case 'complete':
      return <CompletionView></CompletionView>;
    default:
      return <div>404</div>;
  }
}
