import Avvvatars from 'avvvatars-react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Button from '@/components/base/Button';

import { useContact } from '../../hooks/useContact';
import AddChatModel from './components/AddChatModel';

export default function Contact() {
  const navigate = useNavigate();
  const { contactId } = useParams();

  const [visible, setVisible] = useState(false);

  const [payload, op] = useContact(contactId);

  function handleDelete() {
    op.remove();
    navigate('/contacts');
  }

  return (
    <>
      <div className="flex-1 flex justify-center h-full w-full">
        <div className="w-[400px] mt-24">
          <div className="flex justify-between px-2 py-4 sm:px-6">
            <div>
              <h3 className="mb-4 text-xl font-semibold leading-6 text-gray-900">
                {payload.name}
              </h3>
              <p className="text-sm text-gray-500 tracking-wide max-w-[240px] truncate">
                {payload.bio}
              </p>
            </div>
            <Avvvatars value={payload.name} radius={2} size={70} />
          </div>

          <hr className="border-gray-100 my-2" />

          <dl>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 select-none">
                与你的关系
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {payload.relationship || '无'}
              </dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 select-none">
                对你的称呼
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {payload.callYou || '无'}
              </dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 select-none">
                兴趣爱好
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {payload.hobbies || '无'}
              </dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500  select-none">
                其他提示
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {payload.hint || '无'}
              </dd>
            </div>

            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500"></dt>
              <dd className="mt-1 flex space-x-2 text-sm sm:col-span-2 sm:mt-0">
                <Button type="primary" onClick={() => setVisible(true)}>
                  开始聊天
                </Button>
                <Button type="danger" onClick={handleDelete}>
                  删除
                </Button>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <AddChatModel
        visible={visible}
        talkerId={contactId}
        onClose={() => setVisible(false)}
      />
    </>
  );
}
