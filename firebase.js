
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyDmuvKgxk5_mpVaYQwtyLjnH6lKIH8QRE4",
  authDomain: "ecommerce-fcd48.firebaseapp.com",
  projectId: "ecommerce-fcd48",
  storageBucket: "ecommerce-fcd48.appspot.com",
  messagingSenderId: "529500884019",
  appId: "1:529500884019:web:63e68a7544c38afb66a746"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore (app);

import { addDoc} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

export const getProducts = async () => {

const querySnapshot = await getDocs(collection(db, "productos"));

const productos = []

querySnapshot.forEach((doc) => {

productos.push(doc);
});

return productos;

}


export const getProduct = async (id) => {


  const docRef = doc(db, "productos", id);
  const docSnap = await getDoc(docRef);

 if (docSnap.exists()) {
  return docSnap;
 } else {
  console.log("No such document!");
}

} 
