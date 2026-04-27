"use client";

import React, { useEffect, useState } from "react";
import { formatPrice } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Plus, Edit2, Trash2, X } from "lucide-react";

interface Product {
  id: number;
  handle: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  thumbnail: string;
  category_handle: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    handle: "",
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    category_handle: "uncategorized"
  });

  const [isUploading, setIsUploading] = useState(false);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.products);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/uploads`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      
      // Store the full URL in the thumbnail field
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      setFormData(prev => ({ ...prev, thumbnail: `${apiUrl}${data.url}` }));
    } catch (err: any) {
      alert("Failed to upload image: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        handle: product.handle,
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        thumbnail: product.thumbnail,
        category_handle: product.category_handle
      });
    } else {
      setEditingId(null);
      setFormData({ handle: "", title: "", description: "", price: "", thumbnail: "", category_handle: "uncategorized" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const url = editingId 
        ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/products/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/products`;
      
      const method = editingId ? "PATCH" : "POST";
      
      const payload = {
        ...formData,
        price: parseInt(formData.price)
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save product");
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete product");
      fetchProducts();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Products</h1>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus size={16} /> Add Product
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={product.thumbnail} alt={product.title} className="h-12 w-12 object-cover rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.title}
                  <div className="text-xs text-gray-500 font-normal mt-0.5">{product.handle}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatPrice(product.price, product.currency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {product.category_handle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleOpenModal(product)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-serif font-bold text-gray-900">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Handle (URL Slug)</label>
                    <input type="text" required value={formData.handle} onChange={(e) => setFormData({...formData, handle: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price (NPR)</label>
                    <input type="number" required min="0" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category Handle</label>
                    <input type="text" required value={formData.category_handle} onChange={(e) => setFormData({...formData, category_handle: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="drops, nexus, essence..." />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Product Image</label>
                  <div className="flex items-start gap-4">
                    {formData.thumbnail && (
                      <div className="relative w-20 h-20 border rounded overflow-hidden flex-shrink-0">
                        <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        disabled={isUploading}
                      />
                      <p className="text-xs text-gray-500">Or enter URL below:</p>
                      <input 
                        type="url" 
                        value={formData.thumbnail} 
                        onChange={(e) => setFormData({...formData, thumbnail: e.target.value})} 
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        placeholder="https://..." 
                      />
                    </div>
                  </div>
                  {isUploading && <p className="text-xs text-indigo-600 animate-pulse">Uploading image...</p>}
                </div>
              </form>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3 rounded-b-lg">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" form="product-form">Save Product</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
