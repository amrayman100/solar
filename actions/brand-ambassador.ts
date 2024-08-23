"use server";
import { db } from "@/lib/db";
import { brandAmbassador } from "@/lib/schema";

export async function createBrandAmbassadorEntry(req: {
  name: string;
  email: string;
  phoneNumber: string;
}) {
  const res = await db.insert(brandAmbassador).values({ ...req });
  return res;
}
