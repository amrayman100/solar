import { GridTiedQuote } from "@/components/product/grid-tied/grid-tied-quote";
import { db } from "@/lib/db";
import { productTable } from "@/lib/schema";
import { GridTied, GridTiedParams } from "@/models/product";
import { eq } from "drizzle-orm";

async function getGridTiedProduct() {
  const res = await db
    .select()
    .from(productTable)
    .limit(1)
    .where(eq(productTable.name, "grid-tied"));

  if (res.length > 0) {
    const gridTiedDb = res[0];

    const gridTied: GridTied = {
      name: gridTiedDb.name,
      isEnabled: gridTiedDb.isEnabled,
      created: {
        by: gridTiedDb.createdBy || "",
        at: gridTiedDb.createdAt || "",
      },
      updated: {
        by: gridTiedDb.updatedBy || "",
        at: gridTiedDb.updatedAt || "",
      },
      currency: gridTiedDb.currency,
      parameters: gridTiedDb.parameters as GridTiedParams,
    };

    return gridTied;
  }

  return null;
}

export default async function Dashboard() {
  //   const gridTied = await getGridTiedProduct();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <GridTiedQuote />
      </div>
    </main>
  );
}
