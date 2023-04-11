import FieldSelect from '@/components/fields/FieldSelect';

// see https://platform.openai.com/docs/models/model-endpoint-compatibility
import models from './models.json';

export type ModelSelectProps = {
  mode?: 'chat' | 'complete' | 'edit';
  value: string;
  onChange: (value: string) => void;
};

export default function OpenAIModelSelect({
  mode = 'chat',
  value,
  onChange,
}: ModelSelectProps) {
  return (
    <FieldSelect
      label="模型"
      tooltip="对话的 AI 模型"
      options={models[mode] || []}
      value={value}
      onChange={onChange}
    />
  );
}
