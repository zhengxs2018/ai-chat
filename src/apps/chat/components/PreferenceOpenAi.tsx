import SettingTitle from '@/components/settings/SettingTitle';
import FieldGroup from '@/components/fields/FieldGroup';
import FieldInput from '@/components/fields/FieldInput';
import FieldSwitch from '@/components/fields/FieldSwitch';

import { useAppSelector, useAppDispatch } from '../store';
import { updateOpenAI } from '../store/preferences';

export default function PreferenceOpenAi() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.preferences.openai);

  const onChange = (key: string, value: string | number | boolean) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(updateOpenAI({ [key]: value }));
  };

  return (
    <div className="pb-5 flex flex-col space-y-2 overflow-y-scroll sm:py-6 sm:max-h-96 w-full max-h-[32rem]">
      <SettingTitle text="通用信息" />
      <FieldGroup>
        <FieldSwitch
          label="启用自定义配置"
          checked={data.enable}
          onChange={(e) => onChange('enable', e)}
        />
        <FieldInput
          label="基础地址"
          value={data.baseURL}
          placeholder="https://api.openai.com"
          onChange={(e) => onChange('baseURL', e)}
        />
        <FieldInput
          label="API版本"
          value={data.apiVersion}
          placeholder="v1"
          onChange={(e) => onChange('apiVersion', e)}
        />
        <FieldInput
          label="API密钥"
          value={data.apiKey}
          placeholder="sk-xxxxxxxxxxxxxxxxxxx"
          onChange={(e) => onChange('apiKey', e)}
        />
        <FieldInput
          label="组织ID"
          value={data.organization}
          placeholder="org-xxxxxxxxxxxxxxxxxx"
          onChange={(e) => onChange('organization', e)}
        />
      </FieldGroup>
    </div>
  );
}
