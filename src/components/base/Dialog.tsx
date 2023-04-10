import { Dialog as Popup, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export interface DialogProps {
  open: boolean;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Dialog({
  open,
  className,
  onClose,
  children,
}: DialogProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Popup
        as="div"
        className={`relative z-10 ${className}`}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Popup.Panel className="relative transform overflow-hidden rounded-xl shadow-xl bg-white transition-all w-90">
                {children}
              </Popup.Panel>
            </Transition.Child>
          </div>
        </div>
      </Popup>
    </Transition.Root>
  );
}
