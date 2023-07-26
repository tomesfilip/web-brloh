import Logo from './logo/Logo';
import Searchbar from './searchbar/Searchbar';
import UserMenu from './userMenu/UserMenu';

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-evenly py-4 gap-4 md:gap-0">
      <Logo />
      <Searchbar />
      <nav>
        <UserMenu />
      </nav>
    </header>
  );
};

export default Header;
