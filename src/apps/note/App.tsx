import { useCompletionService } from './hooks/useCompletionService';
import { useCompletion } from './hooks/useCompletion';

import CompletionViewEmpty from './components/CompletionViewEmpty';
import CompletionSidebar from './components/CompletionSidebar';
import CompletionEditor from './components/CompletionEditor';

export default function App() {
  const { data } = useCompletion();
  const service = useCompletionService();

  const handleNew = () => {
    service.create();
  };

  return (
    <div className="flex-1 flex">
      <CompletionSidebar onCreate={handleNew} />
      {data ? (
        <CompletionEditor></CompletionEditor>
      ) : (
        <CompletionViewEmpty onCreate={handleNew} />
      )}
    </div>
  );
}
