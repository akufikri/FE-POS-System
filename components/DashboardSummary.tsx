import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";

async function getSalesData() {
  const res = await fetch("https://dummyjson.com/carts/1");
  if (!res.ok) throw new Error("Gagal ngambil data ringkasan penjualan");

  return res.json();
}

export default async function DashboardSummary() {
  const cartData = await getSalesData();

  return (
    <>
      <Card>
        <CardContent>
          <CardTitle>Total transaksi kasir</CardTitle>
          <CardDescription>${cartData.discountedTotal}</CardDescription>
        </CardContent>
      </Card>
    </>
  );
}
