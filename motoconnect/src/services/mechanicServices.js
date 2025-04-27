import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
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
