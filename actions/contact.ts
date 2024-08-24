"use server";
import { db } from "@/lib/db";
import { contactTable } from "@/lib/schema";

export async function createContactEntry(req: {
  name: string;
  email: string;
  phoneNumber: string;
  type: string;
  contactDesc?: string;
}) {
  const res = await db.insert(contactTable).values({ ...req });
  return res;
}
