import headerBtn from '@assets/icons/headerBtn.svg';
import arrowLeft from '@assets/icons/arrowLeft.svg';
import BorderLink from '@/components/BorderLink/BorderLink';
import style from './HomePageHeader.style.module.scss';

export default function HomePageHeader() {
  return (
    <header className={style.header}>
      <div className={style.header__start}>
        <button className={style.header__startBtn}>
          <img src={headerBtn} alt="" />
        </button>
        <button className={style.header__startBtn}>
          <img src={arrowLeft} alt="" />
        </button>
      </div>
      <nav className={style.header__nav}>
        <BorderLink to="/" className={style.header__navBtn}>
          Просмотр
        </BorderLink>
        <BorderLink to="/route" className={style.header__navBtn}>
          Управление
        </BorderLink>
      </nav>
    </header>
  );
}
