"use client";

import React, { useEffect, useState } from "react";
import { formatPrice } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Plus, Edit2, Trash2, X, PlusCircle, MinusCircle } from "lucide-react";

interface Product {
  id: number;
  handle: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  thumbnail: string;
  category_handle: string;
  weight?: number;
  features?: Record<string, string>;
  images?: { url: string }[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState("all");

  // Form State
  const [formData, setFormData] = useState({
    handle: "",
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    category_handle: "uncategorized",
    weight: "",
  });

  const [formFeatures, setFormFeatures] = useState<{ key: string; value: string }[]>([]);
  const [formImages, setFormImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000"}/api/products`, {
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000"}/api/uploads`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataUpload,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000";
      const fileUrl = `${apiUrl}${data.url}`;

      if (isGallery) {
        setFormImages((prev) => [...prev, fileUrl]);
      } else {
        setFormData((prev) => ({ ...prev, thumbnail: fileUrl }));
      }
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
        category_handle: product.category_handle,
        weight: product.weight?.toString() || "",
      });

      // Map features object to array
      const featuresArr = product.features 
        ? Object.entries(product.features).map(([k, v]) => ({ key: k, value: v as string }))
        : [];
      setFormFeatures(featuresArr);

      // Map images
      setFormImages(product.images ? product.images.map(img => img.url) : []);
    } else {
      setEditingId(null);
      setFormData({ handle: "", title: "", description: "", price: "", thumbnail: "", category_handle: "uncategorized", weight: "" });
      setFormFeatures([]);
      setFormImages([]);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const url = editingId 
        ? `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000"}/api/products/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000"}/api/products`;
      
      const method = editingId ? "PATCH" : "POST";
      
      // Convert features array back to object
      const featuresObj: Record<string, string> = {};
      formFeatures.forEach(f => {
        if (f.key.trim()) featuresObj[f.key.trim()] = f.value.trim();
      });

      // Convert image strings back to object format
      const imagesArr = formImages.map(url => ({ url }));

      const payload = {
        ...formData,
        price: parseInt(formData.price),
        weight: formData.weight ? parseFloat(formData.weight) : null,
        features: Object.keys(featuresObj).length > 0 ? featuresObj : null,
        images: imagesArr
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000"}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete product");
      fetchProducts();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const categories = ["all", "drops", "nexus", "essence", "sparkles", "radiance", "emblem", "uncategorized"];
  const filteredProducts = filterCategory === "all" ? products : products.filter(p => p.category_handle === filterCategory);

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Products</h1>
        
        <div className="flex items-center gap-4">
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === "all" ? "All Categories" : c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
          <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
            <Plus size={16} /> Add Product
          </Button>
        </div>
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
            {filteredProducts.map((product) => (
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
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                  No products found for this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-serif font-bold text-gray-900">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
              <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Info Section */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
                  <h3 className="font-medium text-gray-900 border-b pb-2">Basic Info</h3>
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
                      <select required value={formData.category_handle} onChange={(e) => setFormData({...formData, category_handle: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {categories.filter(c => c !== "all").map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                </div>

                {/* Details Section */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
                  <h3 className="font-medium text-gray-900 border-b pb-2">Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Weight (grams)</label>
                    <input type="number" step="0.01" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} className="mt-1 block w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g. 5.2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features (Key/Value)</label>
                    {formFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-2">
                        <input type="text" placeholder="e.g. Stone" value={feature.key} onChange={(e) => {
                          const newF = [...formFeatures];
                          newF[idx].key = e.target.value;
                          setFormFeatures(newF);
                        }} className="w-1/3 px-3 py-1.5 border border-gray-300 rounded-md text-sm" />
                        <input type="text" placeholder="e.g. Ruby" value={feature.value} onChange={(e) => {
                          const newF = [...formFeatures];
                          newF[idx].value = e.target.value;
                          setFormFeatures(newF);
                        }} className="w-1/2 px-3 py-1.5 border border-gray-300 rounded-md text-sm" />
                        <button type="button" onClick={() => setFormFeatures(formFeatures.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700">
                          <MinusCircle size={18} />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => setFormFeatures([...formFeatures, { key: "", value: "" }])} className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1 mt-2">
                      <PlusCircle size={16} /> Add Feature
                    </button>
                  </div>
                </div>

                {/* Images Section */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
                  <h3 className="font-medium text-gray-900 border-b pb-2">Images</h3>
                  
                  {/* Thumbnail */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail (Main Image)</label>
                    <div className="flex items-center gap-4">
                      {formData.thumbnail && (
                        <img src={formData.thumbnail} className="h-16 w-16 object-cover border rounded" alt="Thumb" />
                      )}
                      <input type="text" placeholder="/images/products/..." value={formData.thumbnail} onChange={(e) => setFormData({...formData, thumbnail: e.target.value})} className="flex-1 px-3 py-2 border border-gray-300 rounded-md sm:text-sm" />
                    </div>
                  </div>

                  {/* Gallery */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images</label>
                    <div className="space-y-2">
                      {formImages.map((img, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <img src={img} className="h-10 w-10 object-cover border rounded" alt={`Gallery ${idx}`} />
                          <input type="text" value={img} onChange={(e) => {
                            const newI = [...formImages];
                            newI[idx] = e.target.value;
                            setFormImages(newI);
                          }} className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm" />
                          <button type="button" onClick={() => setFormImages(formImages.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700">
                            <MinusCircle size={18} />
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={() => setFormImages([...formImages, ""])} className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1">
                        <PlusCircle size={16} /> Add Gallery Image
                      </button>
                    </div>
                  </div>

                </div>

              </form>
            </div>
            
            <div className="px-6 py-4 border-t bg-white flex justify-end gap-3 rounded-b-lg">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" form="product-form">Save Product</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
