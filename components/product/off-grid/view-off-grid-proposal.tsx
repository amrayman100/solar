"use client";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
} from "@/components/shared/typography";
import {
  GridTiedProposal,
  OffGridProposal,
  calculateCumulativeSavings,
} from "@/models/product";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Tooltip,
} from "recharts";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ViewOffGridProposal({
  proposal,
}: {
  proposal: OffGridProposal;
}) {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${"/drone-4.jpeg"})` }}
        className="bg-cover bg-center w-screen h-max relative bg-gradient-to-r from-primary via-yellow-400 to-primary pb-10"
      ></div>
    </div>
  );
}
