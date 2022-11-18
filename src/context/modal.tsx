import React, { useState, Context, createContext } from "react";
import type { FC, ReactNode } from "react";
import { useEffect } from "react";

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
    setIsHidden(false);
  };

  const show = () => {
    setIsHidden(true);
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
      {!isHidden && <Modal content={content} />}
    </ModalContext.Provider>
  );
};

const Modal = ({ content }: { content: ReactNode }) => {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-indigo-200 bg-opacity-40">
      <div className="h-60 w-60 rounded-md bg-primary-200">{content}</div>
    </div>
  );
};
