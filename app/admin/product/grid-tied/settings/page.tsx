import { getProduct } from "@/actions/proposal";
import { GridTiedForm } from "@/components/product/grid-tied/settings/grid-tied-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function GridTiedSettings() {
  const session = await auth();
  console.log(session);
  if (!session) {
    redirect("/admin/login");
  }

  const gridTiedProduct = await getProduct();
  return (
    <main className="">
      <div>{gridTiedProduct && <GridTiedForm product={gridTiedProduct} />}</div>
    </main>
  );
}
