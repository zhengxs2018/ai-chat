import Toast from 'react-hot-toast';

import SettingIcon from '@/components/icons/SettingIcon';

import { APP_FEATURES } from '../constants/app';
import ActionBar, { ActionButton } from './ActionBar';
import CurrentUser from './CurrentUser';

export type ActivitybarProps = {
  active: string;
  onActive: (key: string) => void;
};

export default function Activitybar({ active, onActive }: ActivitybarProps) {
  const handleNoop = async () => {
    Toast('没有功能');
  };

  const bottomButtons: ActionButton[] = [
    {
      text: '设置',
      icon: <SettingIcon className="action-button-icon" />,
      key: 'setting',
      onClick: handleNoop,
    },
  ];

  return (
    <div className="ai-activitybar flex-col h-full hidden lg:flex">
      <div className="ai-fcc ai-current-user mb-4">
        <CurrentUser />
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
