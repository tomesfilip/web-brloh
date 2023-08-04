'use client';

import { useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-20 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-full md:w-4/5 lg:w-3/5 xl:w-2/5 my-5 mx-auto h-full md:h-auto">
        <div
          className={`translate duration-300 h-full ${
            showModal ? 'translate-y-0' : 'translete-y-full'
          } ${showModal ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="translate h-full md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center p-4 rounded-none md:rounded-t relative border-b-[1px]">
              <button
                onClick={handleClose}
                className="p-1 border-0 hover:opacity-70 transition absolute right-9"
              >
                <AiOutlineClose />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            <div className="relative p-6 flex-auto">{body}</div>
            <div className="flex flex-col gap-2 p-6">{footer}</div>
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full justify-center">
                <Button onClick={handleSubmit} label={actionLabel} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
