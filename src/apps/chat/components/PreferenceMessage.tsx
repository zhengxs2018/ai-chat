import SettingTitle from '@/components/settings/SettingTitle';
import FieldGroup from '@/components/fields/FieldGroup';
import FieldSlider from '@/components/fields/FieldSlider';
import FieldSwitch from '@/components/fields/FieldSwitch';

import { useAppSelector, useAppDispatch } from '../store';
import { updateChat } from '../store/preferences';

export default function PreferenceMessage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.preferences.message);

  const onChange = (key: string, value: string | number | boolean) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(updateChat({ [key]: value }));
  };

  return (
    <div className="pb-5 flex flex-col space-y-2 overflow-y-scroll sm:py-6 sm:max-h-96 w-full max-h-[32rem]">
      <SettingTitle text="消息配置" />
      <FieldGroup>
        <FieldSlider
          label="最大消息数"
          value={data.maxMessages}
          min={1}
          max={20}
          step={1}
          onChange={(e) => onChange('maxMessages', e)}
        />
        <FieldSwitch
          label="上报助手消息"
          checked={data.reportAssistantMessage}
          onChange={(e) => onChange('reportAssistantMessage', e)}
        />
      </FieldGroup>
    </div>
  );
}
