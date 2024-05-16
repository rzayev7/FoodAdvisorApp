import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDGv6ZWsDExoFbCTsovVZas7FaXfGabD5o",
  authDomain: "fooderra-add3c.firebaseapp.com",
  projectId: "fooderra-add3c",
  storageBucket: "fooderra-add3c.appspot.com",
  messagingSenderId: "368867666944",
  appId: "1:368867666944:web:abc64853fdaae9d5b33ce5"
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);