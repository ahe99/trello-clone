import React, { useState, useEffect, createContext } from "react";
import type { FC, ReactNode } from "react";

import { Modal } from "@components/templates";

export type ModalContextValues = {
  isHidden: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;

  content: ReactNode | null;
  putContent: (content: ReactNode) => void;
  clearContent: () => void;
};

export const ModalContext = createContext<ModalContextValues>(
  {} as ModalContextValues
);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [isHidden, setIsHidden] = useState(true);

  const putContent = (component: ReactNode) => {
    setContent(component);
  };

  const clearContent = () => {
    setContent(null);
  };

  const hide = () => {
    setIsHidden(true);
  };

  const show = () => {
    setIsHidden(false);
  };

  const toggle = () => {
    setIsHidden((prev) => !prev);
  };

  return (
    <ModalContext.Provider
      value={{
        isHidden,
        show,
        hide,
        toggle,
        content,
        putContent,
        clearContent,
      }}
    >
      {children}
      {!isHidden && <Modal />}
    </ModalContext.Provider>
  );
};
