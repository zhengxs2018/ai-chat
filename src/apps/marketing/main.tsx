import React, { useState, useMemo, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import Card from './components/Card';
import apps from './data/apps';
import categories, { CategoryType } from './data/categories';

export type MarketingProps = {
  query?: string;
  category?: CategoryType;
};

export default function Marketing(props: MarketingProps) {
  const [query, setQuery] = useState(props.query || '');
  const [category, setCategory] = useState<CategoryType | 'all'>(
    props.category || 'all'
  );

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      if (category !== 'all' && app.type !== category) {
        return false;
      }

      if (query !== '') {
        return (
          app.name.toLowerCase().includes(query.toLowerCase()) ||
          app.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      return true;
    });
  }, [query, category]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('query', query);
    params.set('category', category);

    history.pushState('', '', `?${params.toString()}`);
  }, [query, category]);

  return (
    <React.StrictMode>
      <section className="pb-8 bg-white lg:pb-24">
        <div className="px-4 mx-auto max-w-8xl">
          <div className="w-full mb-6">
            <div className="flex flex-col items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700 sm:flex-row">
              <div className="flex-shrink-0 w-full sm:w-auto sm:flex">
                <div className="relative flex-shrink-0 w-full mb-4 sm:mb-0 sm:mr-4 sm:w-64 lg:w-96">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"></MagnifyingGlassIcon>
                  </div>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="search"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="搜索应用 or 插件"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value.trim());
                      }}
                    />
                  </form>
                </div>
                <label htmlFor="category" className="hidden">
                  选择分类
                </label>
                <select
                  className="bg-white border border-gray-300 text-gray-900 sm:w-40 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryType)}
                >
                  <option value="all">全部</option>
                  {categories.map((item) => {
                    return (
                      <option key={item.name} value={item.value}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="hidden text-sm text-gray-600 dark:text-gray-400 sm:block">
                显示{filteredApps.length}个结果
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredApps.map((app) => {
              return <Card {...app} key={app.name} />;
            })}
          </div>
        </div>
      </section>
    </React.StrictMode>
  );
}
