import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="flex h-full overflow-hidden bg-white md:border md:rounded-md">
        <Outlet />
      </div>
    </div>
  );
}
