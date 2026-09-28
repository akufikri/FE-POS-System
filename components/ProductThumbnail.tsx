import Image from "next/image";

export const ProductThumbnail = () => {
  return (
    <>
      <div className="relative w-32 h-32 overflow-hidden rounded-lg border border-black">
        <Image
          src={"https://images.unsplash.com/photo-1542291026-7eec264c27ff"}
          alt="Sepatu kasir retail"
          fill // memenuhi area div pembungkus
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority={false} // Set TRUE hanya jika gambar berada di struktur paling atas layar (banner)
        />
      </div>
    </>
  );
};
