'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { FcGoogle } from 'react-icons/fc';
import useLoginModal from '../../hooks/useLoginModal';
import useRegisterModal from '../../hooks/useRegisterModal';
import Button from '../Button';
import Input from '../inputs/Input';
import PasswordInput from '../inputs/PasswordInput';
import Modal from './Modal';

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error, {
          position: 'top-center',
          autoClose: 3000,
          closeOnClick: true,
        });
        return;
      }

      if (res?.ok) {
        loginModal.onClose();
        reset();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error('Nastala chyba při přihlasování', {
        position: 'top-center',
        autoClose: 3000,
        closeOnClick: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <PasswordInput
        id="password"
        label="Heslo"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col items-center gap-4">
      <hr />
      <Button
        label="Přihlásit se pomocí Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Přihlásit se"
      actionLabel="Pokračovat"
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default LoginModal;
