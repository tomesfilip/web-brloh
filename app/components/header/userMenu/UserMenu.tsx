'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

import { User } from '@prisma/client';
import useLoginModalStore from '../../../hooks/useLoginModal';
import useRegisterModal from '../../../hooks/useRegisterModal';
import MenuItem from './MenuItem';

interface UserMenuProps {
  user: User | null;
}

const UserMenu = ({ user }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModalStore();

  const handleMenuClick = (menuFunction: () => void) => {
    menuFunction();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
      >
        <AiOutlineUser color="black" size={40} title="Uživatel" />
      </div>
      {isOpen && (
        <div className="absolute rounded-xl flex flex-col w-max shadow-md bg-white overflow-hidden right-0 top-14 text-sm">
          {user?.email ? (
            <MenuItem
              onClick={() => handleMenuClick(signOut)}
              label="Odhlásit se"
            />
          ) : (
            <>
              <MenuItem
                onClick={() => handleMenuClick(registerModal.onOpen)}
                label="Registrovat se"
              />
              <MenuItem
                onClick={() => handleMenuClick(loginModal.onOpen)}
                label="Přihlásit se"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
