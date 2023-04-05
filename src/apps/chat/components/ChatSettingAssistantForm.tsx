import SettingTitle from '@/components/settings/SettingTitle';
import FieldInput from '@/components/fields/FieldInput';
import FieldGroup from '@/components/fields/FieldGroup';
import FieldTextArea from '@/components/fields/FieldTextArea';
import FieldSwitch from '@/components/fields/FieldSwitch';

export type ChatFieldAssistantFormProps = {
  data: any;
  editable?: boolean;
  disabled?: boolean;
  onChange?: (key: string, value: number | string | boolean) => void;
};

export default function ChatFieldAssistantForm({
  data,
  disabled,
  editable = true,
  onChange = () => void 0,
}: ChatFieldAssistantFormProps) {
  return (
    <div className="pb-5 flex flex-col space-y-2 overflow-y-scroll sm:py-6 sm:max-h-96 w-full max-h-[32rem]">
      <SettingTitle text="AI 信息" />
      <FieldGroup>
        <FieldInput
          text="名称"
          type="text"
          value={data.name}
          helpText="你对 AI 的称呼"
          helpPlacement="right"
          disabled={!editable || disabled}
          placeholder="输入你对AI的称呼"
          onChange={(e) => onChange('name', e)}
        />
        <FieldTextArea
          text="描述"
          helpText={disabled ? '你对 AI 的描述' : null}
          helpPlacement="right"
          value={data.bio}
          disabled={!editable || disabled}
          maxRows={4}
          placeholder="输入你对AI的描述"
          onChange={(e) => onChange('bio', e)}
        />
        <FieldTextArea
          text="默认提示"
          helpText="提供给 AI 的提示信息"
          helpPlacement="right"
          value={data.prompt}
          maxRows={4}
          disabled={!editable || disabled}
          placeholder="输入你对AI的描述"
          onChange={(e) => onChange('prompt', e)}
        />
        {editable && (
          <FieldSwitch
            text="启用 AI 身份"
            helpPlacement="right"
            checked={data.useAssistant}
            helpText="会以 system 角色，把助手身份发送给 OpenAI。"
            onChange={(e) => onChange('useAssistant', e)}
          />
        )}
      </FieldGroup>
    </div>
  );
}
