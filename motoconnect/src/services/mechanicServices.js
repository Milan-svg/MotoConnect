import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

export async function getAllMechanics() {
  const mechanicsRef = collection(db, "mechanics"); // collection keyword used ~ fetched ref of the collecion
  const snapshot = await getDocs(mechanicsRef); // this fetches all docs from that collection.
  //smapshot is an OBJECT. it contains .docs, an array of document-snapshot onjects, doc.id, and doc.data()
  const mechanicsList = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return mechanicsList;
}

// id is outside the doc object which contains the data thats why we spreading ...doc after defining id.

export async function addMechanic(mechanicData) {
  const dataToSend = {
    ...mechanicData,
    available: false,
    status: "pending",
    timestamp: serverTimestamp(),
  };
  try {
    await addDoc(collection(db, "pendingMechanics"), dataToSend);
    return true;
  } catch (err) {
    console.error("error adding mechanic:", err);
    return false; //true/false so that we can conditionally fire toasts.
  }
}

export async function addMechanicRating(
  mechanicId,
  userId,
  userName,
  rating,
  review
) {
  const ratingRef = doc(db, "mechanics", mechanicId, "ratings", userId); // ref, again, is a reference to a doc.
  await setDoc(ratingRef, {
    userId,
    userName,
    rating,
    review,
    timestamp: serverTimestamp(),
  });
}
//the order of arguments dictates the path we have in mind, like mechanics/{mechanicId}/ratings/{userId}. for eg,
//db, point at the mechanics colection, then look at the mechanicId doc of that collection, now look at the ratings collection in that particular mechanicId doc, in that ratings collection look at the userId.

//basically were using userId for rating's id since we only want one review per user on a mechanic, so using userId obviously makes sense.

export async function getMechanicRatings(mechanicId) {
  const ratingRef = collection(db, "mechanics", mechanicId, "ratings");
  const snapshot = await getDocs(ratingRef);
  const ratingList = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return ratingList;
}

// helper func to fetch pending mechanics (for admins)

export async function getPendingMechanics() {
  const snapshot = await getDocs(collection(db, "pendingMechanics"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

//func to approve a mechanic

//okay we first extracted the id to use it for deleting mechanic from pending mechanics, then we delete the id from the mechanic object we just spread {...mechanic} / mechanicData, we pass this mechanicData along with other required stuff to addDoc in the mechanics collection

// export async function getMechanicById(id) {
//   const mechRef = doc(db, "mechanics", id);
//   const snapshot = await getDoc(mechRef);
//   if (snapshot.exists()) {
//     return { id: snapshot.id, ...snapshot.data() };
//   } else {
//     throw new Error("Mechanic not found");
//   }
// }

export async function approveMechanic(mechanic) {
  const mechanicId = mechanic.id;
  const mechanicData = { ...mechanic };
  delete mechanicData.id;

  const dataToSend = {
    ...mechanicData,
    available: true,
    status: "approved",
    approvedAt: serverTimestamp(),
  };
  try {
    await addDoc(collection(db, "mechanics"), dataToSend);
    await deleteDoc(doc(db, "pendingMechanics", mechanicId));
    return true;
  } catch (err) {
    console.error("Error approving mechanic:", err);
    return false;
  }
}

// to delete pendingMechanic

export async function deleteMechanic(mechanicId) {
  try {
    await deleteDoc(doc(db, "pendingMechanics", mechanicId));
    return true;
  } catch (err) {
    console.error("error deleting the pending mechanic:", err);
    return false;
  }
}

export const createUserDoc = async (user) => {
  // takes user from firebase (listentoauthchnges)
  if (!user?.uid) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const userData = {
      id: user.uid,
      email: user.email,
      userName: user.displayName || user.email || "Anonymous",
      role: "user", // default role
    };

    await setDoc(userRef, userData);
    return userData;
  }

  return userSnap.data(); // return existing user
};
