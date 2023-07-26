'use client';

import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

import MenuItem from './MenuItem';
import useRegisterModal from '../../../hooks/useRegisterModal';
import useLoginModalStore from '../../../hooks/useLoginModal';

const UserMenu = () => {
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
          <MenuItem
            onClick={() => handleMenuClick(registerModal.onOpen)}
            label="Registrovat se"
          />
          <MenuItem
            onClick={() => handleMenuClick(loginModal.onOpen)}
            label="Přihlásit se"
          />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
