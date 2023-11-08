"use client";

import swagPhotos from "../../../../photos";
import Image from "next/image";
import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Dialog = styled.dialog`
  &::backdrop {
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(10px);
  }
`;

export default function PhotoModal({ params: { id: photoId } }) {
  const photos = swagPhotos;
  const photo = photos.find((p) => p.id === photoId);
  const dialog = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    dialog.current.showModal();
  });

  return (
    <Dialog ref={dialog} onClose={onDismiss}>
      <Image alt="" src={photo.imageSrc} height={600} width={600} />
    </Dialog>
  );
}
