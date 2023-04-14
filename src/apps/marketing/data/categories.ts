export type CategoryType = 'app' | 'plugin' | 'assistant';

export interface Category {
  name: string;
  value: CategoryType;
  color: string;
}

export const categoryMap = new Map<CategoryType, Category>([
  [
    'app',
    {
      name: '应用',
      value: 'app',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800',
    },
  ],
  [
    'plugin',
    {
      name: '插件',
      value: 'plugin',
      color:
        'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-800',
    },
  ],
  // [
  //   'assistant',
  //   {
  //     name: '助手',
  //     value: 'assistant',
  //     color:
  //       'bg-orange-100 text-orange-800 dark:bg-orange-200 dark:text-orange-800',
  //   },
  // ],
]);

export default Array.from(categoryMap.values());
