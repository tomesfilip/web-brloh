'use client';

import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="hidden md:block">
      <Image height={80} width={80} alt="Brloh logo" src="logo.svg" />
    </Link>
  );
};

export default Logo;
