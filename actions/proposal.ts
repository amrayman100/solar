"use server";
import { db } from "@/lib/db";
import { productTable } from "@/lib/schema";
import { GridTied, GridTiedParams } from "@/models/product";
import { eq } from "drizzle-orm";

export async function createProposal() {
  const res = await db
    .select()
    .from(productTable)
    .limit(1)
    .where(eq(productTable.name, "grid-tied"));

  let gridTied: GridTied;

  if (res.length > 0) {
    const gridTiedDb = res[0];
    gridTied = {
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

    console.log(gridTied);
  }
}
