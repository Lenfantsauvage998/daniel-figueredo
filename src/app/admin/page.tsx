"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Package,
  ShoppingBag,
  Users,
  X,
  Check,
} from "lucide-react";
import type { Product } from "@/types";

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  user: { email: string; name: string | null };
  items: { quantity: number; price: number; product: { title: string } }[];
}

interface Lead {
  id: string;
  email: string;
  name: string | null;
  message: string | null;
  service: string | null;
  createdAt: string;
}

type Tab = "products" | "orders" | "leads";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("products");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.user || data.user.role !== "ADMIN") {
          router.push("/");
        } else {
          setUser(data.user);
          setLoading(false);
        }
      })
      .catch(() => router.push("/"));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-white/30 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-light text-white/90">Admin Dashboard</h1>
          <span className="text-[11px] text-white/30 uppercase tracking-wider">
            {user?.role}
          </span>
        </div>

        <div className="flex gap-1 mb-8 border-b border-white/5">
          <TabButton
            active={tab === "products"}
            onClick={() => setTab("products")}
            icon={<Package className="w-3.5 h-3.5" />}
            label="Products"
          />
          <TabButton
            active={tab === "orders"}
            onClick={() => setTab("orders")}
            icon={<ShoppingBag className="w-3.5 h-3.5" />}
            label="Orders"
          />
          <TabButton
            active={tab === "leads"}
            onClick={() => setTab("leads")}
            icon={<Users className="w-3.5 h-3.5" />}
            label="Leads"
          />
        </div>

        <AnimatePresence mode="wait">
          {tab === "products" && <ProductsTab key="products" />}
          {tab === "orders" && <OrdersTab key="orders" />}
          {tab === "leads" && <LeadsTab key="leads" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-xs tracking-wide transition-colors border-b-2 ${
        active
          ? "text-white border-white"
          : "text-white/30 border-transparent hover:text-white/60"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  const fetchProducts = () => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-colors rounded-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          New Product
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-5 h-5 text-white/30 animate-spin" />
        </div>
      ) : (
        <div className="border border-white/5 rounded-sm overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="text-left px-4 py-3 text-white/30 font-normal uppercase tracking-wider">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-white/30 font-normal uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-white/30 font-normal uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left px-4 py-3 text-white/30 font-normal uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 w-20" />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3 text-white/70">{p.title}</td>
                  <td className="px-4 py-3 text-white/40">{p.category}</td>
                  <td className="px-4 py-3 text-white/70">
                    ${p.price.toFixed(0)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider ${
                        p.isActive
                          ? "text-green-400/70"
                          : "text-white/20"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          p.isActive ? "bg-green-400/70" : "bg-white/20"
                        }`}
                      />
                      {p.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditing(p)}
                        className="p-1.5 hover:bg-white/5 rounded transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5 text-white/40" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 hover:bg-white/5 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-white/40" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(editing || creating) && (
        <ProductModal
          product={editing}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSaved={fetchProducts}
        />
      )}
    </motion.div>
  );
}

function ProductModal({
  product,
  onClose,
  onSaved,
}: {
  product: Product | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title: product?.title || "",
    slug: product?.slug || "",
    description: product?.description || "",
    price: product?.price || 0,
    imageUrl: product?.imageUrl || "",
    category: product?.category || "Web Development",
    isActive: product?.isActive ?? true,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = product ? `/api/products/${product.id}` : "/api/products";
      const method = product ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        onSaved();
        onClose();
      }
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-sm p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-white/90">
            {product ? "Edit Product" : "New Product"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/5 rounded transition-colors"
          >
            <X className="w-4 h-4 text-white/40" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white/30 mb-1">
                Title
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-sm text-xs text-white/80 focus:outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white/30 mb-1">
                Slug
              </label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-sm text-xs text-white/80 focus:outline-none focus:border-white/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-white/30 mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              rows={3}
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-sm text-xs text-white/80 focus:outline-none focus:border-white/20 resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white/30 mb-1">
                Price
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: parseFloat(e.target.value) || 0 })
                }
                required
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-sm text-xs text-white/80 focus:outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white/30 mb-1">
                Category
              </label>
              <input
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                required
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-sm text-xs text-white/80 focus:outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white/30 mb-1">
                Image URL
              </label>
              <input
                value={form.imageUrl}
                onChange={(e) =>
                  setForm({ ...form, imageUrl: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-sm text-xs text-white/80 focus:outline-none focus:border-white/20"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs text-white/60">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.checked })
              }
              className="w-3.5 h-3.5 rounded border-white/20 bg-white/[0.03]"
            />
            Active
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-xs font-medium uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-colors rounded-sm disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <Loader2 className="w-3 h-3 animate-spin" />}
              <Check className="w-3 h-3" />
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-5 h-5 text-white/30 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="border border-white/5 rounded-sm overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="text-left px-4 py-3 text-white/30 font-normal uppercase tracking-wider">
                Order
              </th>
              <th className="text-left px-4 py-3 text-white/30 font-normal uppercase tracking-wider">
                Customer
              </th>
              <th className="text-left px-4 py-3 text-white/30 font-normal uppercase tracking-wider">
                Items
              </th>
              <th className="text-left px-4 py-3 text-white/30 font-normal uppercase tracking-wider">
                Total
              </th>
              <th className="text-left px-4 py-3 text-white/30 font-normal uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 text-white/30 font-normal uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-4 py-3 text-white/50 font-mono">
                  {o.id.slice(0, 8)}
                </td>
                <td className="px-4 py-3 text-white/70">
                  {o.user.name || o.user.email}
                </td>
                <td className="px-4 py-3 text-white/40">
                  {o.items.reduce((s, i) => s + i.quantity, 0)} items
                </td>
                <td className="px-4 py-3 text-white/70">
                  ${o.total.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-[10px] uppercase tracking-wider ${
                      o.status === "COMPLETED"
                        ? "text-green-400/70"
                        : o.status === "CANCELLED"
                        ? "text-red-400/70"
                        : "text-amber-400/70"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/30">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function LeadsTab() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-5 h-5 text-white/30 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="border border-white/5 rounded-sm overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="text-left px-4 py-3 text-white/30 font-normal uppercase tracking-wider">
                Email
              </th>
              <th className="text-left px-4 py-3 text-white/30 font-normal uppercase tracking-wider">
                Name
              </th>
              <th className="text-left px-4 py-3 text-white/30 font-normal uppercase tracking-wider">
                Service
              </th>
              <th className="text-left px-4 py-3 text-white/30 font-normal uppercase tracking-wider">
                Message
              </th>
              <th className="text-left px-4 py-3 text-white/30 font-normal uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr
                key={l.id}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-4 py-3 text-white/70">{l.email}</td>
                <td className="px-4 py-3 text-white/40">
                  {l.name || "—"}
                </td>
                <td className="px-4 py-3 text-white/40">
                  {l.service || "—"}
                </td>
                <td className="px-4 py-3 text-white/40 max-w-xs truncate">
                  {l.message || "—"}
                </td>
                <td className="px-4 py-3 text-white/30">
                  {new Date(l.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
