import SettingIcon from '@/components/icons/SettingIcon';

import { APP_FEATURES } from '../constants/app';
import ActionBar, { ActionButton } from './ActionBar';
import ActivitybarUser from './ActivitybarUser';

export type ActivitybarProps = {
  active: string;
  onActive: (key: string) => void;
};

export default function Activitybar({ active, onActive }: ActivitybarProps) {
  const bottomButtons: ActionButton[] = [
    {
      text: '设置',
      icon: <SettingIcon className="action-button-icon" />,
      key: 'setting',
    },
  ];

  return (
    <div className="ai-activitybar flex-col h-full hidden md:flex">
      <div className="ai-fcc ai-activitybar-user mb-4">
        <ActivitybarUser />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <ActionBar
          active={active}
          buttons={APP_FEATURES}
          onClick={(a) => onActive(a.key)}
        />
        <ActionBar buttons={bottomButtons} />
      </div>
    </div>
  );
}
