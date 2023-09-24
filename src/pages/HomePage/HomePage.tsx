import { Outlet } from 'react-router-dom';
import HomePageHeader from './components/HomePageHeader/HomePageHeader';
import LeftSideBar from '@/pages/HomePage/components/LeftSideBar/LeftSideBar';
import RightSideBar from './components/RightSideBar/RightSideBar';
import style from './HomePage.style.module.scss';

export default function HomePage() {
  return (
    <div className={style.container}>
      <HomePageHeader />
      <div className={style.homePage}>
        <LeftSideBar />
        <RightSideBar />
      </div>
      <Outlet />
    </div>
  );
}
