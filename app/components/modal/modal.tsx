import { useEffect, useRef } from "react";

type ModalProps = {
  children: JSX.Element;
  open: boolean;
};

export default function Modal({ children, open }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    }
  }, [open]);

  return <dialog ref={ref}>{children}</dialog>;
}
