import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  console.log(session);
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        Dashboard
      </div>
    </main>
  );
}
