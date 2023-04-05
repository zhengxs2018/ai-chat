export type ContactAvatarProps = {
  className?: string;
};

function ContactAvatar({
  className = 'min-h-[36px] h-[36px] min-w-[36px] w-[36px]',
}: ContactAvatarProps) {
  return <div className={`ai-fcc bg-gray-200 rounded-sm ${className}`}></div>;
}

export default ContactAvatar;
