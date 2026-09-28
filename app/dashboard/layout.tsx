import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Navbar } from "@/components/Navbar";

export default async function DashboardLayout({ children }: LayoutProps<"/">) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("pos_auth_token")?.value;

  if (!token) redirect("/login");

  return (
    <>
      <main className="space-y-4">
        <Navbar />
        <section className="px-5">
          <div>{children}</div>
        </section>
      </main>
    </>
  );
}
