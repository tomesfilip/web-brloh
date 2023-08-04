'use client';

import { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const PasswordInput = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        type={isPasswordVisible ? 'text' : 'password'}
        {...register(id, { required })}
        placeholder=" "
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          errors[id] ? 'border-rose-500' : 'border-neutral-300'
        }`}
      />
      <label
        className={`absolute select-none text-sm duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          errors[id] ? 'text-rose-500' : 'text-zinc-400'
        }`}
      >
        {label}
      </label>
      <button
        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400"
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
      </button>
    </div>
  );
};
export default PasswordInput;
