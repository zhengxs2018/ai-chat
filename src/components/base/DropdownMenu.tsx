import { Menu, Transition } from '@headlessui/react';
import React from 'react';

export type DropdownMenuProps = {
  button: React.ReactNode;
  className?: string;
  itemsClassName?: string;
  children: React.ReactNode;
};

export default function DropdownMenu({
  className,
  itemsClassName,
  button,
  children,
}: DropdownMenuProps) {
  return (
    <Menu
      as="div"
      className={`relative inline-block text-left z-10 ${className || ''}`}
    >
      {button}
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items
          className={`absolute origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black   ring-opacity-5 focus:outline-none ${itemsClassName}`}
        >
          <div className="px-1 py-1">{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
