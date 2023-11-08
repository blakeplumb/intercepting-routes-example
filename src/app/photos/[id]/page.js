import swagPhotos from "../../../photos";
import Image from "next/image";

export default function PhotoPage({ params: { id } }) {
  const photo = swagPhotos.find((p) => p.id === id);

  return (
    <div>
      <h1>{photo.name}</h1>
      <Image alt="" src={photo.imageSrc} height={600} width={600} />
    </div>
  );
}
