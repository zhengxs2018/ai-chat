import Avvvatars from 'avvvatars-react';

import type { IContactPayload } from '../interfaces';

export type ContactAvatarProps = {
  className?: string;
  payload: IContactPayload;
};

export function ContactAvatar({
  payload,
  className = 'min-h-[36px] h-[36px] min-w-[36px] w-[36px]',
}: ContactAvatarProps) {
  return (
    <div className={`ai-fcc ${className}`}>
      <Avvvatars value={payload.name} radius={4} />
    </div>
  );
}
