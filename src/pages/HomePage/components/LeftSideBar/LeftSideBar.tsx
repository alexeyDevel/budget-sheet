import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ProjectNameIcon from '@assets/icons/projectNameIcon.svg';
import InfoSelector from '../../../../components/InfoSelector/InfoSelector';
import style from './LeftSideBar.module.scss';
import { NavLink } from 'react-router-dom';

export default function LeftSideBar() {
  return (
    <div className={style.leftSideBar}>
      <div className={style.leftSideBar__header}>
        <InfoSelector value={'0'} />
      </div>
      <div className={style.leftSideBar__listWrapper}>
        <List className={style.leftSideBar__list}>
          <ListItem className={style.leftSideBar__li}>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? 'pending' : isActive ? style.active : ''
              }
            >
              <ListItemIcon className={style.leftSideBar__icon}>
                <img src={ProjectNameIcon} alt="" />
              </ListItemIcon>
              <ListItemText classes={{ primary: style.leftSideBar__text }}>
                По проекту
              </ListItemText>
            </NavLink>
          </ListItem>
          <ListItem className={style.leftSideBar__li}>
            <NavLink to="/">
              <ListItemIcon className={style.leftSideBar__icon}>
                <img src={ProjectNameIcon} alt="" />
              </ListItemIcon>
              <ListItemText classes={{ primary: style.leftSideBar__text }}>
                СМР
              </ListItemText>
            </NavLink>
          </ListItem>
        </List>
      </div>
    </div>
  );
}
