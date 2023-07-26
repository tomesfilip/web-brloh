'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';

import useRegisterModal from '../../hooks/useRegisterModal';

import Modal from './Modal';
import Input from '../inputs/Input';
import Button from '../Button';
import PasswordInput from '../inputs/PasswordInput';

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
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    console.log('Submitting');
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
        id="username"
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
        onClick={() => console.log('sign in - google')}
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
