import React from "react";
import type { FC, ReactNode, MouseEvent } from "react";

import { useModal } from "@hooks";

interface ModalProps {
  canCloseByBackdrop?: boolean;
  className?: string;
  backdropClassName?: string;
}

export const Modal: FC<ModalProps> = ({
  canCloseByBackdrop = true,
  className,
  backdropClassName,
}) => {
  const modal = useModal();

  const handleClose = () => {
    if (canCloseByBackdrop) {
      modal.hide();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-indigo-100 bg-opacity-40 ${backdropClassName}`}
      onClick={handleClose}
    >
      <div
        className={`rounded-md bg-primary-200 p-4 ${className}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {modal.content}
      </div>
    </div>
  );
};
