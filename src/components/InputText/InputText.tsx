import { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import style from './InputText.style.module.scss';
import { styled } from '@mui/system';

const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #414144',
    background: 'transparent',
    color: '#fff',
    transition: 'border-color 0.2s',
    outline: 'none',
    '&:hover': {
      borderColor: '#fff',
    },
    '&:focus': {
      borderColor: '#fff',
    },
  },
}));
interface InputTextProps {
  value: string | number;
  onChange: (value: string | number) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number' | 'password';
}

export default function InputText({
  value,
  onChange,
  onKeyDown,
  type = 'text',
  ...props
}: InputTextProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const parsedValue = type === 'number' && newValue === '' ? 0 : newValue;
    onChange(parsedValue);
  };

  return (
    <StyledTextField
      type={type}
      value={value}
      onChange={handleChange}
      className={style.input}
      variant="standard"
      onKeyDown={onKeyDown}
      InputProps={{
        disableUnderline: true,
      }}
      {...props}
    />
  );
}
