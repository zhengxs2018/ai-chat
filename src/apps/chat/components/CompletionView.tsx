import { useCompletion } from '../hooks/useCompletion';
import CompletionEditor from './CompletionEditor';
import CompletionViewEmpty from './CompletionViewEmpty';
import CompletionParameterPanel from './CompletionParameterPanel';
import CompletionSidebar from './CompletionSidebar';

export default function CompletionView() {
  const { data } = useCompletion();

  return (
    <div className="flex-1 flex">
      <CompletionSidebar></CompletionSidebar>
      {data ? (
        <>
          <CompletionEditor></CompletionEditor>
          <CompletionParameterPanel></CompletionParameterPanel>
        </>
      ) : (
        <CompletionViewEmpty></CompletionViewEmpty>
      )}
    </div>
  );
}
