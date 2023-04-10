import Toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Dialog from '@/components/base/Dialog';
import Button from '@/components/base/Button';
import FieldGroup from '@/components/fields/FieldGroup';
import FieldInput from '@/components/fields/FieldInput';
import FieldTextArea from '@/components/fields/FieldTextArea';

import type { ChatCreateInput } from '../../../models/chats';
import { useChatsDataSource } from '../../../hooks/useChatsDataSource';

function initialState(talkerId: string): ChatCreateInput {
  return {
    title: '',
    description: '',
    talker_id: talkerId,
  };
}

export type AddChatModelProps = {
  visible: boolean;
  talkerId: string;
  onClose: () => void;
};

export default function AddChatModel({
  talkerId,
  visible,
  onClose,
}: AddChatModelProps) {
  const navigate = useNavigate();

  const chats = useChatsDataSource();
  const [formData, setFormData] = useState<ChatCreateInput>(
    initialState(talkerId)
  );

  const onChange = (name: string, value: string) => {
    setFormData((state) => ({ ...state, [name]: value }));
  };

  useEffect(() => setFormData(initialState(talkerId)), [talkerId]);

  const onSave = () => {
    if (!formData.title) {
      return Toast.error('标题不能为空');
    }

    const chat = chats.create(formData);
    navigate(`/chats/${chat.id}`);
    onClose();
  };

  const handleClose = () => {
    setFormData(initialState(talkerId));
    onClose();
  };

  return (
    <Dialog open={visible} onClose={onClose}>
      <div className="min-w-[300px] md:w-[400px] px-4 py-6">
        <div className="text-left text-gray-700 font-medium text-lg mb-2">
          新增聊天室
        </div>
        <FieldGroup>
          <FieldInput
            label="标题"
            value={formData.title}
            onChange={(value) => onChange('title', value)}
          />
          <FieldTextArea
            label="描述"
            value={formData.description}
            rows={4}
            maxRows={4}
            maxLength={40}
            onChange={(value) => onChange('description', value)}
          />
          <div className="flex justify-end space-x-2 mt-2">
            <Button type="primary" onClick={onSave}>
              保存
            </Button>
            <Button onClick={handleClose}>关闭</Button>
          </div>
        </FieldGroup>
      </div>
    </Dialog>
  );
}
