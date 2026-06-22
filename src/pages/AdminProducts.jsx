import { useState, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Upload, Loader2, Image as ImageIcon, Search, X, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import fullCatalog from '../components/dentalcore/full_catalog.json';

export default function AdminProducts() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [dialogMode, setDialogMode] = useState('edit'); // 'edit' | 'create'
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dragActive, setDragActive] = useState(false);
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const categories = useMemo(() => ['all', ...new Set(products.map(p => p.category))], [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, categoryFilter]);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Product.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
      setDialogOpen(false);
      setEditingProduct(null);
    },
    onError: () => {
      toast.error('Failed to update product');
    },
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Product.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
      setDialogOpen(false);
      setEditingProduct(null);
      setDialogMode('edit');
    },
    onError: () => {
      toast.error('Failed to create product');
    },
  });

  const getEmptyFormData = () => ({
    name: '',
    category: '',
    price: '$0.00',
    description: '',
    image: '',
    images: [],
    variants: [],
    stock: 100,
  });

  const handleEdit = (product) => {
    setDialogMode('edit');
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image,
      images: product.images || [],
      variants: product.variants || [],
      stock: Number.isFinite(Number(product.stock)) ? Number(product.stock) : 100,
    });
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setDialogMode('create');
    setEditingProduct(null);
    setFormData(getEmptyFormData());
    setDialogOpen(true);
  };

  const handleImageUpload = async (files) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => 
        base44.integrations.Core.UploadFile({ file })
      );
      const results = await Promise.all(uploadPromises);
      const urls = results.map(r => r.file_url);
      
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), ...urls]
      }));
      
      toast.success(`${urls.length} image(s) uploaded successfully`);
    } catch {
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await base44.integrations.Core.UploadFile({ file });
      setFormData({ ...formData, image: result.file_url });
      toast.success('Main image uploaded');
    } catch {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  }, []);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const setPrimaryImage = (url) => {
    setFormData(prev => ({
      ...prev,
      image: url
    }));
    toast.success('Primary image set');
  };

  const addVariant = () => {
    const newVariant = {
      id: Date.now().toString(),
      name: '',
      sku: '',
      price: formData.price,
      options: {},
      image: '',
      stock: 0
    };
    setFormData(prev => ({
      ...prev,
      variants: [...(prev.variants || []), newVariant]
    }));
  };

  const updateVariant = (index, field, value) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      newVariants[index] = { ...newVariants[index], [field]: value };
      return { ...prev, variants: newVariants };
    });
  };

  const updateVariantOption = (index, optionKey, optionValue) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      newVariants[index] = {
        ...newVariants[index],
        options: { ...newVariants[index].options, [optionKey]: optionValue }
      };
      return { ...prev, variants: newVariants };
    });
  };

  const removeVariant = (index) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const normalizePrice = (value) => {
    const raw = String(value ?? '').trim();
    if (!raw) return '$0.00';
    if (raw.startsWith('$')) return raw;
    const n = Number(raw);
    return Number.isFinite(n) ? `$${n.toFixed(2)}` : `$${raw}`;
  };

  const buildPayload = () => {
    const mainImage = String(formData.image || '').trim();
    const gallery = (formData.images || []).filter(Boolean);
    return {
      name: String(formData.name || '').trim(),
      category: String(formData.category || '').trim(),
      price: normalizePrice(formData.price),
      description: String(formData.description || '').trim(),
      image: mainImage,
      images: gallery.length > 0 ? gallery : (mainImage ? [mainImage] : []),
      variants: Array.isArray(formData.variants) ? formData.variants : [],
      stock: Number.isFinite(Number(formData.stock)) ? Number(formData.stock) : 100,
    };
  };

  const handleSave = () => {
    const payload = buildPayload();
    if (!payload.name || !payload.category || !payload.description || !payload.image) {
      toast.error('Name, category, description, and main image are required.');
      return;
    }

    if (dialogMode === 'create') {
      createMutation.mutate(payload);
      return;
    }

    if (!editingProduct) return;
    updateMutation.mutate({
      id: editingProduct.id,
      data: payload,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
              <p className="text-gray-500 mt-1">Manage your product catalog, variants, and images</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreate} className="bg-[#111] hover:bg-accent">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
              <Link to="/admin/quotes" className="text-sm bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                Quotes
              </Link>
              <Link to="/admin/orders" className="text-sm bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                Orders
              </Link>
              <Link to="/admin/dashboard" className="text-sm bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col md:flex-row gap-3 mt-4 items-center">
            <div className="text-sm text-gray-500 flex-1">
              Showing {filteredProducts.length} of {products.length} products
            </div>

            {(import.meta.env.DEV || import.meta.env.VITE_ENABLE_ADMIN_DANGER === 'true') && (
              <>
                <Button onClick={async () => {
                  toast.loading('Wiping database...', { duration: 3000 });
                  let delCount = 0;
                  for (const p of products) {
                    try {
                      await base44.entities.Product.delete(p.id);
                      delCount++;
                    } catch {
                      console.error('Failed to delete', p.id);
                    }
                  }
                  toast.dismiss();
                  toast.success('Deleted ' + delCount + ' mock products');
                  queryClient.invalidateQueries(['admin-products']);
                }} variant="destructive" className="bg-red-600 hover:bg-red-700">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Wipe Mock Data
                </Button>

                <Button onClick={async () => {
                  toast.loading('Importing catalog...');
                  let successCount = 0;
                  for (const p of fullCatalog) {
                    try {
                      await base44.entities.Product.create({
                        name: p.name,
                        category: p.category,
                        price: '$' + Number(p.price).toFixed(2),
                        description: p.description,
                        image: p.image || '',
                        images: p.image ? [p.image] : [],
                        variants: p.variants || [],
                        stock: 100
                      });
                      successCount++;
                    } catch {
                      console.error('Failed to import', p.name);
                    }
                  }
                  toast.dismiss();
                  toast.success('Successfully imported ' + successCount + ' products');
                  queryClient.invalidateQueries(['admin-products']);
                }} variant="outline" className="border-amber-500 text-amber-600">
                  <Upload className="w-4 h-4 mr-2" />
                  Seed {fullCatalog.length} Products from Full Catalog
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 relative">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`${product.image ? 'hidden' : 'flex'} absolute inset-0 items-center justify-center text-gray-400`}>
                  <ImageIcon className="w-16 h-16" />
                </div>
                {product.variants && product.variants.length > 0 && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {product.variants.length} variants
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</div>
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{product.price}</p>
                <Button onClick={() => handleEdit(product)} variant="outline" size="sm" className="w-full">
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit Product
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingProduct(null);
            setDialogMode('edit');
          }
        }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{dialogMode === 'create' ? 'Add Product' : 'Edit Product'}</DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="variants">Variants</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-4">
                <div>
                  <Label>Main Image</Label>
                  <div className="mt-2 space-y-3">
                    {formData.image && (
                      <div className="aspect-square w-full max-w-xs mx-auto bg-gray-100 rounded-lg overflow-hidden">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-contain p-4" />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageUpload}
                        disabled={uploading}
                        className="flex-1"
                      />
                      {uploading && <Loader2 className="w-5 h-5 animate-spin text-gray-400" />}
                    </div>
                    <Input
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Or paste image URL"
                    />
                  </div>
                </div>

                <div>
                  <Label>Product Name</Label>
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Category</Label>
                  <Input
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Price</Label>
                  <Input
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>
              </TabsContent>

              <TabsContent value="images" className="space-y-4 mt-4">
                <div>
                  <Label>Bulk Image Upload</Label>
                  <div
                    className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop images here, or click to select
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                      id="bulk-upload"
                    />
                    <label htmlFor="bulk-upload">
                      <Button type="button" variant="outline" size="sm" disabled={uploading} asChild>
                        <span>
                          {uploading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            'Select Images'
                          )}
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>

                {formData.images && formData.images.length > 0 && (
                  <div>
                    <Label>Product Images ({formData.images.length})</Label>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500">
                          <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-contain p-2" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => setPrimaryImage(img)}
                              className="text-xs"
                            >
                              Set Primary
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeImage(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          {formData.image === img && (
                            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                              Primary
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="variants" className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <Label>Product Variants</Label>
                  <Button onClick={addVariant} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Variant
                  </Button>
                </div>

                {formData.variants && formData.variants.length > 0 ? (
                  <div className="space-y-4">
                    {formData.variants.map((variant, index) => (
                      <div key={variant.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-semibold text-gray-700">Variant {index + 1}</span>
                          <Button
                            onClick={() => removeVariant(index)}
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">Variant Name</Label>
                            <Input
                              value={variant.name}
                              onChange={(e) => updateVariant(index, 'name', e.target.value)}
                              placeholder="e.g., Large / Blue"
                              size="sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">SKU</Label>
                            <Input
                              value={variant.sku}
                              onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                              placeholder="e.g., SKU-001"
                              size="sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Price</Label>
                            <Input
                              value={variant.price}
                              onChange={(e) => updateVariant(index, 'price', e.target.value)}
                              placeholder="$99.99"
                              size="sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Stock</Label>
                            <Input
                              type="number"
                              value={variant.stock}
                              onChange={(e) => updateVariant(index, 'stock', parseInt(e.target.value) || 0)}
                              placeholder="0"
                              size="sm"
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs">Options (Size, Color, Material)</Label>
                          <div className="grid grid-cols-3 gap-2 mt-1">
                            <Input
                              value={variant.options?.size || ''}
                              onChange={(e) => updateVariantOption(index, 'size', e.target.value)}
                              placeholder="Size"
                              size="sm"
                            />
                            <Input
                              value={variant.options?.color || ''}
                              onChange={(e) => updateVariantOption(index, 'color', e.target.value)}
                              placeholder="Color"
                              size="sm"
                            />
                            <Input
                              value={variant.options?.material || ''}
                              onChange={(e) => updateVariantOption(index, 'material', e.target.value)}
                              placeholder="Material"
                              size="sm"
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs">Variant Image URL</Label>
                          <Input
                            value={variant.image}
                            onChange={(e) => updateVariant(index, 'image', e.target.value)}
                            placeholder="https://example.com/variant-image.jpg"
                            size="sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No variants added yet. Click "Add Variant" to create one.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={updateMutation.isPending || createMutation.isPending}>
                {(updateMutation.isPending || createMutation.isPending) ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  dialogMode === 'create' ? 'Create Product' : 'Save Changes'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}