import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpRightIcon, ArrowDownRightIcon, ExternalLinkIcon } from "@/components/icons";

// Transaction (Earnings)
export interface Transaction {
  id: string;
  description: string;
  amount: string;
  type: "income" | "withdrawal";
  date: string;
}

export const transactionColumns: ColumnDef<Transaction, unknown>[] = [
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className={`flex h-8 w-8 items-center justify-center manga-outline-sm ${
          row.original.type === "income" ? "bg-emerald-100" : "bg-amber-100"
        }`}>
          {row.original.type === "income" ? (
            <ArrowUpRightIcon size={14} className="text-emerald-600" />
          ) : (
            <ArrowDownRightIcon size={14} className="text-amber-600" />
          )}
        </div>
        <span className="font-bold text-foreground">{row.original.description}</span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-foreground/50">{row.original.date}</span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <span className={`inline-flex manga-outline-sm px-2.5 py-0.5 text-[10px] font-bold ${
        row.original.type === "income"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-amber-100 text-amber-700"
      }`}>
        {row.original.type === "income" ? "Income" : "Withdrawal"}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className={`font-extrabold ${
        row.original.type === "income" ? "text-emerald-600" : "text-foreground/60"
      }`}>
        {row.original.amount}
      </span>
    ),
  },
];

// Proposal
export interface Proposal {
  id: string;
  project: string;
  client: string;
  budget: string;
  status: "pending" | "accepted" | "rejected";
  date: string;
}

export const proposalColumns: ColumnDef<Proposal, unknown>[] = [
  {
    accessorKey: "project",
    header: "Project",
    cell: ({ row }) => (
      <div>
        <span className="font-bold text-foreground">{row.original.project}</span>
        <p className="text-[11px] text-foreground/40 mt-0.5">{row.original.client}</p>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-foreground/50 text-sm">{row.original.date}</span>
    ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => (
      <span className="font-extrabold text-foreground">{row.original.budget}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className={`inline-flex manga-outline-sm px-2.5 py-0.5 text-[10px] font-bold ${
        row.original.status === "accepted" ? "bg-emerald-100 text-emerald-700" :
        row.original.status === "pending" ? "bg-amber-100 text-amber-700" :
        "bg-red-100 text-red-700"
      }`}>
        {row.original.status}
      </span>
    ),
  },
];

// Campaign
export interface Campaign {
  id: string;
  name: string;
  discount: string;
  status: "active" | "ended";
  startDate: string;
  endDate: string;
  views: number;
}

export const campaignColumns: ColumnDef<Campaign, unknown>[] = [
  {
    accessorKey: "name",
    header: "Campaign",
    cell: ({ row }) => (
      <div>
        <span className="font-bold text-foreground">{row.original.name}</span>
        <p className="text-[11px] text-foreground/40 mt-0.5">{row.original.startDate} — {row.original.endDate}</p>
      </div>
    ),
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => (
      <span className="font-extrabold text-primary">{row.original.discount} OFF</span>
    ),
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => (
      <span className="text-foreground/60 font-medium">{row.original.views.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className={`inline-flex manga-outline-sm px-2.5 py-0.5 text-[10px] font-bold ${
        row.original.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
      }`}>
        {row.original.status}
      </span>
    ),
  },
];

// My Post
export interface MyPost {
  id: string;
  type: "service" | "job";
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  status: string;
  tags: string[];
  url?: string;
  created_at: string;
}

export const myPostColumns: ColumnDef<MyPost, unknown>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <span className="text-sm">{row.original.type === "service" ? "🔧" : "💼"}</span>
        <div>
          <span className="font-bold text-foreground">{row.original.title}</span>
          <p className="text-[11px] text-foreground/40 mt-0.5 line-clamp-1">{row.original.description}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="inline-flex manga-outline-sm px-2 py-0.5 text-[10px] font-bold bg-primary/10 text-primary">
        {row.original.category}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="font-manga text-primary font-bold">
        {row.original.currency}{row.original.price.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className={`inline-flex manga-outline-sm px-2 py-0.5 text-[10px] font-bold ${
        row.original.status === "active" ? "bg-emerald-100 text-emerald-700" :
        row.original.status === "draft" ? "bg-foreground/5 text-foreground/50" :
        "bg-red-50 text-red-500"
      }`}>
        {row.original.status}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.url && (
          <a
            href={row.original.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 manga-outline-sm text-foreground/30 hover:text-primary transition-colors"
          >
            <ExternalLinkIcon size={12} />
          </a>
        )}
      </div>
    ),
  },
];
