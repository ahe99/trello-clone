import React, { useContext } from "react";

import { ModalContext } from "@context/modal";

export const useModal = () => {
  const { isHidden, show, hide, toggle, content, putContent, clearContent } =
    useContext(ModalContext);

  return {
    isHidden,
    show,
    hide,
    toggle,
    content,
    putContent,
    clearContent,
  };
};
