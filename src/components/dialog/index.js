"use client";

import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const Dialog = ({ children }) => {
  const dialog = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    dialog.current.showModal();
  });

  return (
    <dialog ref={dialog} onClose={onDismiss}>
      {children}
    </dialog>
  );
};

export default Dialog;
