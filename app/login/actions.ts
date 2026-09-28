"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();

  if (username.length === 0) redirect("/login?error=empty");

  const cookieStore = await cookies();

  cookieStore.set("pos_auth_token", `demo-${username}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/dashboard");
}
