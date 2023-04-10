import { useState, useEffect } from 'react';
import Toast from 'react-hot-toast';

import Dialog from '@/components/base/Dialog';
import Button from '@/components/base/Button';
import FieldGroup from '@/components/fields/FieldGroup';
import FieldInput from '@/components/fields/FieldInput';
import FieldTextArea from '@/components/fields/FieldTextArea';

import { useAppSelector, useAppDispatch } from '../store';
import { closeUserPopup } from '../store/app';
import { setUser } from '../store/auth';

export default function UserProfileModel() {
  const dispatch = useAppDispatch();

  const { visible, user } = useAppSelector((state) => ({
    visible: state.app.userProfilePopupVisible,
    user: state.auth.user,
  }));

  const [formData, setFormData] = useState(user);

  const onSave = () => {
    if (!formData.name) {
      return Toast.error('用户名不能为空');
    }

    dispatch(closeUserPopup());
    if (formData.name === user.name && formData.bio === user.bio) {
      return;
    }

    dispatch(setUser(formData));
  };

  const onClose = () => {
    setFormData(user);
    dispatch(closeUserPopup());
  };

  const onChange = (name: string, value: string) => {
    setFormData((state) => ({ ...state, [name]: value }));
  };

  useEffect(() => setFormData(user), [user]);

  return (
    <Dialog open={visible} onClose={onClose}>
      <div className="min-w-[300px] md:w-[400px] px-4 py-6">
        <div className="text-left text-gray-700 font-medium text-lg mb-2">
          用户信息
        </div>
        <FieldGroup>
          <FieldInput
            label="用户名"
            value={formData.name}
            onChange={(value) => onChange('name', value)}
          />
          <FieldTextArea
            label="简介"
            value={formData.bio}
            rows={6}
            maxRows={6}
            onChange={(value) => onChange('bio', value)}
          />
          <div className="flex justify-end space-x-2 mt-2">
            <Button type="primary" onClick={onSave}>
              保存
            </Button>
            <Button onClick={onClose}>关闭</Button>
          </div>
        </FieldGroup>
      </div>
    </Dialog>
  );
}
