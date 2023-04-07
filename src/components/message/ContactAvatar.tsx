import Avvvatars from 'avvvatars-react';
import { IContact } from './interfaces';

export type ContactAvatarProps = {
  className?: string;
  payload: IContact;
};

function ContactAvatar({
  payload,
  className = 'min-h-[36px] h-[36px] min-w-[36px] w-[36px]',
}: ContactAvatarProps) {
  return (
    <div className={`ai-fcc ${className}`}>
      <Avvvatars value={payload.name} />
    </div>
  );
}

export default ContactAvatar;
