import Toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Dialog from '@/components/base/Dialog';
import Button from '@/components/base/Button';
import FieldGroup from '@/components/fields/FieldGroup';
import FieldInput from '@/components/fields/FieldInput';
import FieldTextArea from '@/components/fields/FieldTextArea';

import { ContactCreateInput } from '../models/contacts';
import { useContactsDataSource } from '../hooks/useContactsDataSource';

import { useAppSelector, useAppDispatch } from '../store';
import { closeAddContactModel } from '../store/app';

function initialState(): ContactCreateInput {
  return {
    name: '',
    relationship: '',
    bio: '',
    hobbies: '',
    callYou: '',
    hint: '',
  };
}

export default function AddContactModel() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const visible = useAppSelector((state) => state.app.addContactVisible);

  const contacts = useContactsDataSource();
  const [formData, setFormData] = useState<ContactCreateInput>(initialState());

  const onSave = () => {
    if (!formData.name) {
      return Toast.error('名称不能为空');
    }

    const contact = contacts.create(formData);
    navigate(`/contacts/${contact.id}`);
    dispatch(closeAddContactModel());
  };

  const onClose = () => {
    setFormData(initialState());
    dispatch(closeAddContactModel());
  };

  const onChange = (name: string, value: string) => {
    setFormData((state) => ({ ...state, [name]: value }));
  };

  return (
    <Dialog open={visible} onClose={onClose}>
      <div className="min-w-[300px] md:w-[400px] px-4 py-6">
        <div className="text-left text-gray-700 font-medium text-lg mb-2">
          新增联系人
        </div>
        <FieldGroup>
          <FieldInput
            label="姓名"
            value={formData.name}
            onChange={(value) => onChange('name', value)}
          />
          <FieldTextArea
            label="简介"
            value={formData.bio}
            rows={4}
            maxRows={4}
            maxLength={40}
            onChange={(value) => onChange('bio', value)}
          />
          <FieldInput
            label="与你的关系"
            value={formData.relationship}
            onChange={(value) => onChange('relationship', value)}
          />
          <FieldInput
            label="对你的称呼"
            value={formData.callYou}
            onChange={(value) => onChange('callYou', value)}
          />
          <FieldInput
            label="兴趣爱好"
            value={formData.hobbies}
            onChange={(value) => onChange('hobbies', value)}
          />
          <FieldTextArea
            label="其他提示"
            value={formData.hint}
            maxRows={4}
            maxLength={40}
            onChange={(value) => onChange('hint', value)}
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
