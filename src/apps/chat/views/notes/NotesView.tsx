import {
  CompletionContext,
  useCompletionProvider,
} from '../../hooks/useCompletionProvider';

import CompletionViewEmpty from './components/CompletionViewEmpty';
import CompletionSidebar from './components/CompletionSidebar';
import CompletionEditor from './components/CompletionEditor';

export default function NotesView() {
  const provider = useCompletionProvider();

  const handleNew = () => {
    provider.create();
  };

  return (
    <CompletionContext.Provider value={provider}>
      <div className="flex-1 flex">
        <CompletionSidebar onCreate={handleNew} />
        {provider.current ? (
          <CompletionEditor></CompletionEditor>
        ) : (
          <CompletionViewEmpty onCreate={handleNew} />
        )}
      </div>
    </CompletionContext.Provider>
  );
}
