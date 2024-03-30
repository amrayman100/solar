import { getProduct } from "@/actions/proposal";
import { GridTiedForm } from "@/components/product/proposal/settings/grid-tied-form";
import Header from "@/components/shared/header";
import { TypographyH1 } from "@/components/shared/typography";

export default async function GridTiedSettings() {
  const gridTiedProduct = await getProduct();
  return (
    <main className="">
      <div>{gridTiedProduct && <GridTiedForm product={gridTiedProduct} />}</div>
    </main>
  );
}
