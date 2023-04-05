import FieldSlider from '@/components/fields/FieldSlider';

import { useCompletionService } from '../hooks/useCompletionService';
import OpenAIModelEngineSelect from './OpenAIModelSelect';

export default function CompletionParameterPanel() {
  const { preferences, setPreference } = useCompletionService();

  return (
    <div className="ai-secondary-sidebar ml-4 hidden lg:block">
      <div className="flex flex-col space-y-2 w-full overflow-y-scroll py-6">
        <OpenAIModelEngineSelect
          mode="complete"
          value={preferences.model}
          onChange={(e) => setPreference('model', e)}
        />
        <FieldSlider
          text="Temperature"
          helpText=""
          value={preferences.temperature}
          min="0.1"
          max="1"
          step="0.1"
          onChange={(e) => setPreference('temperature', e)}
        />
        <FieldSlider
          text="Maximum Length"
          helpText=""
          value={preferences.max_tokens}
          min="1"
          max="2048"
          step="1"
          onChange={(e) => setPreference('max_tokens', e)}
        />
        <FieldSlider
          text="Top P"
          helpText=""
          value={preferences.top_p}
          min="0"
          max="1"
          step="0.1"
          onChange={(e) => setPreference('top_p', e)}
        />
        <FieldSlider
          text="Frequency Penalty"
          helpText=""
          value={preferences.frequency_penalty}
          min="0"
          max="2"
          step="0.1"
          onChange={(e) => setPreference('frequency_penalty', e)}
        />
        <FieldSlider
          text="Presence Penalty"
          helpText=""
          value={preferences.presence_penalty}
          min="0"
          max="2"
          step="0.1"
          onChange={(e) => setPreference('presence_penalty', e)}
        />
      </div>
    </div>
  );
}
