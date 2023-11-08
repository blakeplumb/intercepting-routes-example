import Link from "next/link";
import swagPhotos from "../photos";
import Image from "next/image";

export default function Home() {
  const photos = swagPhotos;

  return (
    <main>
      <h1>NextGram</h1>
      {photos.map(({ id, imageSrc }) => (
        <Link key={id} href={`/photos/${id}`}>
          <Image alt="" src={imageSrc} height={500} width={500} />
        </Link>
      ))}
    </main>
  );
}
