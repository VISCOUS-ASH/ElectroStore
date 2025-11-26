import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import { syncProductsToFirestore } from '../utils/syncProducts';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleSyncProducts = async () => {
    setSyncing(true);
    setSyncMessage('');
    try {
      const result = await syncProductsToFirestore();
      if (result.success) {
        setSyncMessage(`✓ Successfully synced ${result.count} products to Firestore!`);
        setTimeout(() => setSyncMessage(''), 3000);
        fetchProducts();
      } else {
        setSyncMessage(`✗ Error: ${result.error}`);
      }
    } catch (error) {
      setSyncMessage(`✗ Sync failed: ${error.message}`);
    } finally {
      setSyncing(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    setImageFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const onSubmit = async (data) => {
    let imageUrl = editing?.imageUrl || '';
    if (imageFile) {
      const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const productData = { ...data, imageUrl, price: parseFloat(data.price) };

    if (editing) {
      await updateDoc(doc(db, 'products', editing.id), productData);
    } else {
      await addDoc(collection(db, 'products'), productData);
    }

    reset();
    setImageFile(null);
    setEditing(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditing(product);
    setValue('name', product.name);
    setValue('price', product.price);
    setValue('description', product.description);
    setValue('category', product.category);
  };

  const handleDelete = async (id, imageUrl) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteDoc(doc(db, 'products', id));
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Product Manager</h1>
          <div className="flex gap-2">
            <button
              onClick={handleSyncProducts}
              disabled={syncing}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-500"
            >
              {syncing ? 'Syncing...' : 'Sync Local Products'}
            </button>
            <Link to="/admin" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              Back to Dashboard
            </Link>
          </div>
        </div>
        {syncMessage && (
          <div className={`mb-4 p-4 rounded ${syncMessage.includes('✓') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {syncMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {editing ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input {...register('name')} placeholder="Product Name" className="w-full px-3 py-2 border rounded" required />
              <input {...register('price')} type="number" step="0.01" placeholder="Price" className="w-full px-3 py-2 border rounded" required />
              <textarea {...register('description')} placeholder="Description" className="w-full px-3 py-2 border rounded" rows="3" required />
              <input {...register('category')} placeholder="Category" className="w-full px-3 py-2 border rounded" required />

              <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer">
                <input {...getInputProps()} />
                {imageFile ? (
                  <p>Selected: {imageFile.name}</p>
                ) : (
                  <p>Drag & drop an image here, or click to select</p>
                )}
              </div>

              <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700">
                {editing ? 'Update Product' : 'Add Product'}
              </button>
              {editing && (
                <button type="button" onClick={() => { setEditing(null); reset(); setImageFile(null); }} className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600">
                  Cancel
                </button>
              )}
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Product List</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded">
                  <div className="flex items-center space-x-4">
                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">₹{product.price}</p>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id, product.imageUrl)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManager;