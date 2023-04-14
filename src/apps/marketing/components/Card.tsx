import clsx from 'clsx';

import { categoryMap, CategoryType } from '../data/categories';

export type CardProps = {
  name: string;
  description: string;
  image: string;
  type: CategoryType;
  link: string;
};

export default function Card({
  name,
  description,
  type,
  image,
  link,
}: CardProps) {
  const category = categoryMap.get(type);

  return (
    <a
      className="h-64 bg-white border border-gray-100 rounded-lg cursor-pointer md:h-80 hover:border-white dark:border-gray-700 dark:hover:border-gray-600 hover:shadow-lg dark:hover:shadow-lg-light dark:bg-gray-900"
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <article className="bg-gray-50 dark:bg-gray-700 rounded-t-md py-2.5 px-5 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <div className="text-left">
          <h2 className="flex items-center text-base font-medium text-gray-900 dark:text-white">
            {name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="text-gray-900 space-x-2 dark:text-white">
          <span
            className={clsx(
              'text-xs font-medium px-2.5 py-0.5 rounded',
              category.color
            )}
          >
            {category.name}
          </span>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-200 text-gray-500">
            BETA
          </span>
        </div>
      </article>
      <div className="relative flex items-center justify-center h-[calc(100%_-_4rem)]">
        <div className="relative w-full h-auto text-center">
          <img
            className="max-w-full mx-auto h-44 md:h-48 bg-gray-100"
            src={image}
          />
        </div>
      </div>
    </a>
  );
}
