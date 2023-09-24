import { NavLink } from 'react-router-dom';
import style from './BorderLink.style.module.scss';
import clsx from 'clsx';

interface BorderLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export default function BorderLink({
  to,
  children,
  className,
}: BorderLinkProps) {
  return (
    <NavLink
      to={'#'}
      className={
        to !== '/' ? `pending ${className}` : `${style.active} ${className}`
      }
    >
      <div className={clsx(style.linkInner)}>{children}</div>
    </NavLink>
  );
}
