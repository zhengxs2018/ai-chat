import { useState } from 'react';

import Activitybar from './components/Activitybar';
import Viewport from './components/Viewport';
import { DEFAULT_APP_FEATURE } from './constants/app';

function App() {
  const [viewName, setViewName] = useState(DEFAULT_APP_FEATURE);

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="mx-auto max-w-[1440px] h-full md:min-h-[600px] lg:py-8 transition-all ease-out duration-200">
        <div className="flex h-full overflow-hidden bg-white md:border md:rounded-md">
          <Activitybar active={viewName} onActive={setViewName}></Activitybar>
          <Viewport viewName={viewName}></Viewport>
        </div>
      </div>
    </div>
  );
}

export default App;
