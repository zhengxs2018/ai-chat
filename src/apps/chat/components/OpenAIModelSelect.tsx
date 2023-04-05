import FieldSelect from '@/components/base/FieldSelect';

import { OPENAI_MODEL_ENGINES_MAP } from '../constants/openai';

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
  const engines = OPENAI_MODEL_ENGINES_MAP[mode] || [];

  return (
    <FieldSelect
      text="模型"
      helpText="对话的 AI 模型"
      helpPlacement="top"
      options={engines}
      value={value}
      onChange={onChange}
    />
  );
}
