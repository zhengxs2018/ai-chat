import type { ReactNode } from 'react';

export type SettingCatalogItem = {
  icon: ReactNode;
  name: string;
};

interface SettingSelectorProps {
  selected: string | null;
  catalogItems: string[];
  catalogIcons: JSX.Element[];
  onSelect: (item: string) => void;
}

function SettingSelector({
  selected,
  onSelect,
  catalogItems,
  catalogIcons,
}: SettingSelectorProps) {
  return (
    <div className="w-40 px-2">
      {catalogItems.map((item, key) => (
        <div
          key={item}
          className={`py-1 rounded-lg hover:bg-gray-200 text-gray-700 hover:text-black cursor-pointer text-left pl-4 flex flex-row space-x-2 items-center mt-2 ${
            item === selected ? 'selected bg-gray-200 font-medium' : ''
          }`}
          onClick={() => onSelect(item)}
        >
          <div>{catalogIcons[key]}</div>
          <div>{item}</div>
        </div>
      ))}
    </div>
  );
}

export default SettingSelector;
