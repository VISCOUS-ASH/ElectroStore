import { collection, writeBatch, doc, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { products } from '../data/products';

export const syncProductsToFirestore = async () => {
  try {
    const batch = writeBatch(db);
    const productsCollection = collection(db, 'products');
    
    products.forEach((product) => {
      const docRef = doc(productsCollection, String(product.id));
      batch.set(docRef, product);
    });
    
    await batch.commit();
    console.log(`Successfully synced ${products.length} products to Firestore`);
    return { success: true, count: products.length };
  } catch (error) {
    console.error('Error syncing products to Firestore:', error);
    return { success: false, error: error.message };
  }
};

export const checkIfProductsExist = async () => {
  try {
    const productsCollection = collection(db, 'products');
    const snapshot = await getDocs(productsCollection);
    return snapshot.size > 0;
  } catch (error) {
    console.error('Error checking products:', error);
    return false;
  }
};

export const clearProductsFromFirestore = async () => {
  try {
    const productsCollection = collection(db, 'products');
    const snapshot = await getDocs(productsCollection);
    const batch = writeBatch(db);
    
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log('Successfully cleared all products from Firestore');
    return { success: true };
  } catch (error) {
    console.error('Error clearing products:', error);
    return { success: false, error: error.message };
  }
};
