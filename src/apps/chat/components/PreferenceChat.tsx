import SettingTitle from '@/components/settings/SettingTitle';
import FieldGroup from '@/components/fields/FieldGroup';
import FieldSlider from '@/components/fields/FieldSlider';
import FieldSwitch from '@/components/fields/FieldSwitch';

import ModelSelect from '@/components/openai/ModelSelect';

import { useAppSelector, useAppDispatch } from '../store';
import { updateChat } from '../store/preferences';

export default function PreferenceChat() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.preferences.chat);

  const onChange = (key: string, value: string | number | boolean) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(updateChat({ [key]: value }));
  };

  return (
    <div className="pb-5 flex flex-col space-y-2 overflow-y-scroll sm:py-6 sm:max-h-96 w-full max-h-[32rem]">
      <SettingTitle text="模型配置" />
      <FieldGroup>
        <ModelSelect
          mode="chat"
          value={data.model}
          onChange={(e) => onChange('model', e)}
        />
        <FieldSlider
          label="采样温度"
          value={data.temperature}
          min={0}
          max={2}
          step={0.1}
          onChange={(e) => onChange('maxTokens', e)}
        />
        <FieldSlider
          label="最大长度"
          value={data.maxTokens}
          min={128}
          max={4096}
          step={1}
          onChange={(e) => onChange('maxTokens', e)}
        />
      </FieldGroup>
      <SettingTitle text="消息配置" />
      <FieldGroup>
        <FieldSwitch
          label="上报助手消息"
          checked={data.reportAssistantMessage}
          onChange={(e) => onChange('reportAssistantMessage', e)}
        />
        <FieldSlider
          label="最大消息数"
          value={data.maxMessages}
          min={1}
          max={20}
          step={1}
          onChange={(e) => onChange('maxMessages', e)}
        />
      </FieldGroup>
    </div>
  );
}
