'use client';

import axios, { isAxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

import useRegisterModal from '../../hooks/useRegisterModal';
import Button from '../Button';
import Input from '../inputs/Input';
import PasswordInput from '../inputs/PasswordInput';
import Modal from './Modal';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/register', data);
      if (res.status === 200) {
        registerModal.onClose();
        reset();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data, {
          position: 'top-center',
          autoClose: 3000,
          closeOnClick: true,
        });
      } else {
        toast.error('Nastala chyba při registraci', {
          position: 'top-center',
          autoClose: 3000,
          closeOnClick: true,
        });
      }
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
      <Input
        id="name"
        label="Jméno"
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
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Registrace"
      actionLabel="Pokračovat"
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default RegisterModal;
