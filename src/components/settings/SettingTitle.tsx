export type SettingTitleProps = {
  className?: string;
  text: string;
};

export default function SettingTitle({
  className = '',
  text,
}: SettingTitleProps) {
  return (
    <div className={`text-left text-gray-700 font-medium text-lg ${className}`}>
      {text}
    </div>
  );
}
