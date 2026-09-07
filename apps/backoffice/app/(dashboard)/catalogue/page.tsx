"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { Button } from "@bolt-energy/ui/components/button";
import { Input, Select } from "@bolt-energy/ui/components/inputs";
import { errorMessage, formatMoney } from "@/lib/format";
import { useStaffQueryArgs } from "@/lib/use-staff-query-args";

export default function CataloguePage() {
  const staffArgs = useStaffQueryArgs();
  const products = useQuery(api.catalogue.listAllProducts, staffArgs);
  const categories = useQuery(api.catalogue.listCategories);
  const updateProduct = useMutation(api.catalogue.updateProduct);
  const [categoryId, setCategoryId] = useState<string>("all");
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    if (!products) return [];
    if (categoryId === "all") return products;
    return products.filter((product) => product.categoryId === categoryId);
  }, [products, categoryId]);

  async function save(
    productId: Id<"products">,
    patch: Parameters<typeof updateProduct>[0]
  ) {
    setError("");
    try {
      await updateProduct({ ...patch, productId });
    } catch (err) {
      setError(errorMessage(err, "Update failed"));
    }
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-6 py-10">
      <h1 className="text-3xl font-bold text-(--primary)">Catalogue</h1>
      <Select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
        <option value="all">All categories</option>
        {categories?.map((category) => (
          <option key={category._id} value={category._id}>
            {category.nameEn}
          </option>
        ))}
      </Select>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {products === undefined ? (
        <p>Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-(--border)">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-(--secondary)">
              <tr>
                <th className="px-3 py-2">SKU</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Stock</th>
                <th className="px-3 py-2">Availability</th>
                <th className="px-3 py-2">Published</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product._id} className="border-t border-(--border)">
                  <td className="px-3 py-2 font-mono text-xs">{product.sku}</td>
                  <td className="px-3 py-2">{product.nameEn}</td>
                  <td className="px-3 py-2">
                    <Input
                      type="number"
                      className="w-28"
                      defaultValue={product.priceEgp ?? ""}
                      onBlur={(event) => {
                        const value = event.target.value;
                        void save(product._id, {
                          productId: product._id,
                          priceEgp: value === "" ? undefined : Number(value),
                        });
                      }}
                    />
                    <span className="ms-1 text-xs text-(--muted-foreground)">
                      {product.priceEgp !== undefined ? formatMoney(product.priceEgp) : "quote"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <Input
                      type="number"
                      className="w-20"
                      defaultValue={product.stockQty}
                      onBlur={(event) =>
                        void save(product._id, {
                          productId: product._id,
                          stockQty: Number(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td className="px-3 py-2">
                    <Select
                      value={product.availability}
                      onChange={(event) =>
                        void save(product._id, {
                          productId: product._id,
                          availability: event.target.value as typeof product.availability,
                        })
                      }
                    >
                      <option value="in_stock">in_stock</option>
                      <option value="on_request">on_request</option>
                      <option value="quote_only">quote_only</option>
                    </Select>
                  </td>
                  <td className="px-3 py-2">
                    <Button
                      onClick={() =>
                        void save(product._id, {
                          productId: product._id,
                          isPublished: !product.isPublished,
                        })
                      }
                    >
                      {product.isPublished ? "Yes" : "No"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
