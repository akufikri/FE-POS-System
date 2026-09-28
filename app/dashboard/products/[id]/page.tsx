import type { Metadata } from "next";

interface ProductsDetailProps {
  params: Promise<{ id: string }>; // 👈 params bersifat ASYNC di Next.js terbaru;
}

export async function generateMetadata({
  params,
}: ProductsDetailProps): Promise<Metadata> {
  const { id } = await params;

  const product = await fetch(`https://dummyjson.com/products/${id}`).then(
    (res) => res.json(),
  );

  return {
    title: `${product.title} - Inventaris POS Skildev`,
    description: `Beli ${product.title} harga terbaik $${product.price}. Sisa stok gudang: ${product.stock} unit.`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.thumbnail }],
    },
  };
}

export default async function ProductsDetail({ params }: ProductsDetailProps) {
  const { id } = await params;
  return (
    <>
      <div>
        <h1>Products Details Pages #{id}</h1>
      </div>
    </>
  );
}
