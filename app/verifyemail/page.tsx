'use client';

import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const VerifyEmailPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const params = useSearchParams();
  const token = params.get('token');

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        const res = await axios.post('/api/verifyemail/', {token});
        console.log(res);
        setVerified(true);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Neznámá chyba při ověřování mailové adresy.');
        }
      }
    };

    if (token && token?.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      <h1>Verify Email</h1>
      <h2 className="p-2 text-black bg-orange-500">
        {token ? `${token}` : 'no token'}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email ověřen, pokračuj přihlášením</h2>
          <Link href="/">Brloh - Domov</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl text-black bg-red-500">{error}</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
