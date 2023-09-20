import getCurrentUser from '@/app/actions/getCurrentUser';
import Logo from './logo/Logo';
import Searchbar from './searchbar/Searchbar';
import UserMenu from './userMenu/UserMenu';

const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="flex flex-row items-center gap-4 py-4 justify-evenly md:gap-0">
      <Logo />
      <Searchbar />
      <nav>
        <UserMenu user={user} />
      </nav>
    </header>
  );
};

export default Header;
