import React from "react";
import { externalProductSchema, ExternalProduct } from "@/types/product";
import z from "zod";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

async function getSafeProducts(): Promise<ExternalProduct[]> {
  const res = await fetch("https://dummyjson.com/products?limit=3");
  const rawData = await res.json();

  const validatedProducts = z
    .array(externalProductSchema)
    .safeParse(rawData.products);

  if (!validatedProducts.success) {
    console.log("Eror validasi struktur api:", validatedProducts.error);
    throw new Error("Struktur data produk tidak sah dari server pusat.");
  }
  return validatedProducts.data;
}

export default async function SafeProductList() {
  const products = await getSafeProducts();
  return (
    <>
      <div className="space-y-2">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {product.title} - ${product.price}
                </CardTitle>{" "}
                <Badge>{product.stock}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
