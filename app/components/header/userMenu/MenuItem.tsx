interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem = ({ onClick, label }: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-300 transition font-semibold cursor-pointer"
    >
      {label}
    </div>
  );
};
export default MenuItem;
