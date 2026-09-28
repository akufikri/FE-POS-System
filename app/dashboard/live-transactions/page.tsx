// import { unstable_noStore as noStore } from "next/cache";

// //Implementasi dari unstable_nostore
// async function getLiveTransactionReciepts() {
//   // 🚫 Matikan fungsi cache! Paksa fetch melakukan request baru ke server setiap halaman diakses
//   noStore();
//   const res = await fetch("https://dummyjson.com/carts");

//   if (!res.ok) {
//     throw new Error("Gagal ngambil data transaksi");
//   }

//   const data = await res.json();

//   console.log(data);

//   return data;
// }
export const dynamic = "force-dynamic";

export default async function LiveTransactionsPage() {
  //   const data = await getLiveTransactionReciepts();

  const res = await fetch("https://dummyjson.com/users");

  if (!res.ok) {
    throw new Error("Gagal ngambil data user");
  }

  const data = await res.json();

  const serverTime = new Date().toLocaleTimeString("id-ID");

  // eslint-disable-next-line react-hooks/purity
  const randomValue = Math.random().toFixed(6);

  console.log("🔥 FETCH COMPLETED:", new Date().toISOString());
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Monitor transaksi kasir realtime</h1>

      <p>
        <strong>Server Render Time:</strong> {serverTime}
      </p>

      <p className="mt-2">
        <strong>Random Value:</strong> {randomValue}
      </p>

      <p className="mt-2">Total pengguna terhubung aktif: {data.total} akun</p>

      <div className="mt-6 space-y-4">
        {data.users.map((user: any) => (
          <div key={user.id} className="rounded-lg">
            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        ))}
      </div>

      {/* <p className="mt-2">Total transaksi: {data.total}</p> */}

      {/* <div className="mt-6 space-y-4">
        {data.carts.map((cart: any) => (
          <div key={cart.id} className="rounded-lg border p-4">
            <p className="font-semibold">Cart #{cart.id}</p>
            <p className="text-sm text-gray-500">Total: ${cart.total}</p>
            <p className="text-sm text-gray-500">
              Produk: {cart.totalProducts}
            </p>
          </div>
        ))}
      </div> */}
    </main>
  );
}
