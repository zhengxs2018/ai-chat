import SettingTitle from '@/components/settings/SettingTitle';
import FieldInput from '@/components/fields/FieldInput';

export type ChatSettingMessageForm = {
  data: { title: string };
  onChange?: (key: string, value: number | string | boolean) => void;
};

export default function ChatSettingForm({
  data,
  onChange,
}: ChatSettingMessageForm) {
  return (
    <div className="pb-5 flex flex-col space-y-2 overflow-y-scroll sm:py-6 sm:max-h-96 w-full max-h-[32rem]">
      <SettingTitle text="聊天配置" />
      <FieldInput
        text="标题"
        type="text"
        value={data.title}
        helpText="显示的消息标题"
        helpPlacement="right"
        placeholder=""
        onChange={(e) => onChange('title', e)}
      />
    </div>
  );
}
