// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  doc,
  where,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQ2s2GflH8RMZ1JZhWAx3lf-_Twxdg5R8",
  authDomain: "tvspace-956d5.firebaseapp.com",
  projectId: "tvspace-956d5",
  storageBucket: "tvspace-956d5.appspot.com",
  messagingSenderId: "238726326396",
  appId: "1:238726326396:web:51a3248d7f29dfce7401f9",
  measurementId: "G-GB6VRY57X5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(collection(db, "users"), user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        myList: [],
        friends: [],
        pendingFriendRequests: [],
        sentFriendRequests: [],
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    return err;
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((res) => {
      updateProfile(auth.currentUser, { displayName: name });
      return res;
    });
    const user = res.user;
    await setDoc(doc(collection(db, "users"), user.uid), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      myList: [],
      friends: [],
      pendingFriendRequests: [],
      sentFriendRequests: [],
      photoURL: user.photoURL,
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const getUserData = async (id) => {
  const snapShot = await getDoc(doc(db, "users", id));
  if (snapShot.exists()) {
    return snapShot.data();
  } else {
    console.log("Data doesn't exist");
  }
};

const updateUserMovieList = async (id, newList) => {
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    myList: newList,
  });
};

const getLikes = async (id) => {
  const snapShot = await getDoc(doc(db, "likes", id));
  if (snapShot.exists()) {
    return snapShot.data();
  } else {
    console.log("Data doesn't exist");
    return null;
  }
};

const giveALike = async (showID, userID) => {
  const data = await getLikes(showID);
  console.log(data);
  if (data) {
    if (IsUserHasAlreadyLike(data.users, userID)) {
      // console.log("user has liked");
      const newUserList = data.users.filter((each) => each !== userID);
      updateLikeOfSingleShow(showID, newUserList);
    } else {
      const newUserList = [...data.users, userID];
      console.log(newUserList);
      updateLikeOfSingleShow(showID, newUserList);
    }
  } else {
    console.log("movie has not been created");
    const formatUserID = String(userID);
    await setDoc(doc(collection(db, "likes"), showID), {
      id: showID,
      users: [formatUserID],
    });
  }
};

const IsUserHasAlreadyLike = (userList, userID) => {
  const isFound = userList.find((each) => {
    return each === userID;
  });
  if (isFound) {
    return true;
  }
  return false;
};

const updateLikeOfSingleShow = async (id, newUserList) => {
  const userRef = doc(db, "likes", id);
  await updateDoc(userRef, {
    users: newUserList,
  });
};

export const getAllUsers = async () => {
  const snap = await getDocs(collection(db, "users"));
  const userList = snap.docs.map((doc) => doc.data());
  return userList;
};

export const updateSentRequests = async (newData, userID) => {
  const ref = doc(db, "users", userID);
  await updateDoc(ref, {
    sentFriendRequests: newData,
  });
};

export const updatePendingFriendRequests = async (newData, userID) => {
  const ref = doc(db, "users", userID);
  await updateDoc(ref, {
    pendingFriendRequests: newData,
  });
};

export const updateFriendList = async (newData, userID) => {
  const ref = doc(db, "users", userID);
  await updateDoc(ref, {
    friends: newData,
  });
};

// const updateUserMovieList = async (uid, thumbnail, name, description, id) => {
//   const userRef = doc(db, "users", uid);
//   updateDoc(userRef, {
//     myList: arrayUnion({
//       name: String(name),
//       id: String(id),
//       thumbnail: String(thumbnail),
//       description: String(description),
//     }),
//   });
// };

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  getUserData,
  updateUserMovieList,
  getLikes,
  giveALike,
  IsUserHasAlreadyLike,
};
