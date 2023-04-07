import FieldSelect from '@/components/fields/FieldSelect';

// see https://platform.openai.com/docs/models/model-endpoint-compatibility
import models from './models.json';

export type OpenAIModelSelectSelectProps = {
  mode?: 'chat' | 'complete' | 'edit';
  value: string;
  onChange: (value: string) => void;
};

export default function OpenAIModelSelect({
  mode = 'chat',
  value,
  onChange,
}: OpenAIModelSelectSelectProps) {
  return (
    <FieldSelect
      text="模型"
      helpText="对话的 AI 模型"
      helpPlacement="top"
      options={models[mode] || []}
      value={value}
      onChange={onChange}
    />
  );
}
