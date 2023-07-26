import { IconType } from 'react-icons/lib';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: IconType;
}

const Button = ({ label, onClick, disabled, icon: Icon }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full outline-none flex items-center gap-4 max-w-max"
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};
export default Button;
