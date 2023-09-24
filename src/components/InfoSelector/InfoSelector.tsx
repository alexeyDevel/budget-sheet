import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ArrowDown from '@assets/icons/arrowDown.svg';
import clsx from 'clsx';
import style from './InfoSelector.style.module.scss';

interface InfoSelectorProps {
  value: string;
  className?: string;
}

export default function InfoSelector({ value, className }: InfoSelectorProps) {
  const [select, setSelect] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (event: { target: { value: string } }) => {
    setSelect(event.target.value);
  };
  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setSelect(value);
  }, [value]);
  return (
    <div className={style.selectWrapper} onClick={toggleSelect}>
      <div className={style.selectInner}>
        <Select
          className={clsx(style.select, className)}
          value={select}
          onChange={handleChange}
          open={isOpen}
        >
          <MenuItem value={0}>Название проекта</MenuItem>
          <MenuItem value={1}>Twenty</MenuItem>
          <MenuItem value={2}>Thirty</MenuItem>
        </Select>
        <p>Аббревиатура</p>
      </div>
      <img
        src={ArrowDown}
        alt=">"
        className={clsx(style.selectIcon, {
          [style.selectIconRotated]: isOpen,
        })}
      />
    </div>
  );
}
