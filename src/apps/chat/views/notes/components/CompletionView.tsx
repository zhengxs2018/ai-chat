import { useCompletionService } from '../../../hooks/useCompletionService';
import { useCompletion } from '../../../hooks/useCompletion';

import CompletionViewEmpty from './CompletionViewEmpty';
import CompletionSidebar from './CompletionSidebar';
import CompletionEditor from './CompletionEditor';

export default function CompletionView() {
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
