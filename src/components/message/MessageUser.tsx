import type { IMessagePayload } from './interfaces';

import { formatDate } from './utils';

export type MessageUserProps = {
  className?: string;
  payload: IMessagePayload;
};

function MessageUser({ payload }: MessageUserProps) {
  const { self, talker, date } = payload;

  if (self) {
    <div className="flex items-center mb-1">
      <div className="text-xs text-gray-300 mr-2">{formatDate(date)}</div>
    </div>;
  }

  return (
    <div
      className={`flex items-center mb-1 ${
        self ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className="contact-name max-w-[126px] truncate">{talker.name}</div>
      <div
        className={`text-xs text-gray-300 ${
          self ? 'order-first mr-2 ' : 'ml-2 '
        }`}
      >
        {formatDate(date)}
      </div>
    </div>
  );
}

export default MessageUser;
