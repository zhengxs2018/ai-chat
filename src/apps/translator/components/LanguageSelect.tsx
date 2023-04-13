import { supportLanguages } from '../utils/lang';

export type LanguageSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function LanguageSelect({
  value,
  onChange,
}: LanguageSelectProps) {
  return (
    <select
      className="w-full py-1 px-2 border border-gray-200 rounded-md cursor-pointer focus:outline-none select-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {supportLanguages.map(([code, lang]) => {
        return (
          <option value={code} key={code}>
            {lang}
          </option>
        );
      })}
    </select>
  );
}
