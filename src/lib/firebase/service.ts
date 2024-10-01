// conection ke database firebase
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

// const retrieveData = async (collectionName: string) => {
//   // menambah parameter didalam function agar bisa digunakan lagi dan tidak langsung ke products
//   const querySnapshot = await getDocs(collection(firebaseDB, collectionName));
//   // return querySnapshot;

//   const data = querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   return data;
// };

// export default retrieveData;

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

// membuat services baru untuk detail product
export async function retrieveDataById(collectionName: string, id: string) {
  // mengambil satu data berdasarkan id
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();

  return data;
}

// services login user
export async function login(userData: { email: string }) {
  const qry = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(qry);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}

// services untuk register user
export async function register(
  userData: {
    email: string;
    fullName: string;
    password: string;
    role?: string;
  },
  callback: Function
) {
  const qry = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(qry);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    callback({
      status: false,
      message: "email already exist",
    });
  } else {
    // melakukan bcrypt password
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({ status: true, message: "Register success" });
      })
      .catch((error) => {
        // callback({ status: false, message: "Register failed" });
        callback({ status: false, message: error });
      });
  }
}
