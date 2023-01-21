import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  query,
  orderBy,
  limit,
  doc,
  collection,
  getDocs,
  startAfter,
  startAt,
  endAt,
  getDoc,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdGW2-4eYhVp_ZV3Pu7zqI7Av9uB3RsBc",
  authDomain: "pls-bro.firebaseapp.com",
  projectId: "pls-bro",
  storageBucket: "pls-bro.appspot.com",
  messagingSenderId: "75695591724",
  appId: "1:75695591724:web:259b42bfbb7d30e2fddc89",
  measurementId: "G-42K1FL2V2H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export async function getCollectionDetails(address) {
  try {
    if (address) {
      console.log(`Pulling collection details for ${address}`);

      const docRef = doc(db, "collections", address.toString());
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.log(`${address} not found in db`);
      } else {
        const collectionData = await docSnap.data();
        console.log(collectionData);
        return collectionData;
      }
    } else {
      console.log("No address specified");
    }
  } catch (err) {
    console.log(err);
  }

  return undefined;
}

export async function getMintingCollections() {
  let collectionList = [];
  try {
    console.log("getting collections minting");

    const collectionRef = collection(db, "collections");
    const q = query(collectionRef, limit(20), where("minting", "==", true));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      let collectionData = doc.data();
      collectionList.push(collectionData);
    });
  } catch (err) {
    console.log(err);
  }

  return collectionList;
}
