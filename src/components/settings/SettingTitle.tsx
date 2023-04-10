export type SettingTitleProps = {
  text: string;
};

export default function SettingTitle({ text }: SettingTitleProps) {
  return (
    <div className="text-left text-gray-700 font-medium text-lg">{text}</div>
  );
}
