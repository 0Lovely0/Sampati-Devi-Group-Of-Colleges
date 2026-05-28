import { Outlet } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar />
      <main className="flex-grow"><Outlet /></main>
      <MainFooter />
    </div>
  );
}