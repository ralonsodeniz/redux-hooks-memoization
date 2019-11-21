import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};

let redirectUrl = "";
if (process.env.NODE_ENV === "development") {
  redirectUrl = process.env.REACT_APP_LOCALHOST;
} else {
  redirectUrl = process.env.REACT_APP_DEPLOY_URL;
}

export const actionCodeSettings = {
  url: redirectUrl
};

// firebase util functions
export const checkUserProfileDocumentInFS = async (user, additionalData) => {
  if (!user) throw new Error("Credentials not provided");
  const userRef = firestore.doc(`users/${user.uid}`);
  try {
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      const { displayName, email, photoUrl, providerData } = user;
      const createdAt = new Date();
      const avatarUrl = photoUrl || "";
      const providerId = providerData[0].providerId;
      let gender = "";
      let age = 0;
      if (additionalData) {
        gender = additionalData.gender;
        age = parseInt(additionalData.age);
      }
      try {
        await userRef.set({
          displayName,
          email,
          avatarUrl,
          providerId,
          createdAt,
          gender,
          age
        });
      } catch (error) {
        console.log("error while checking user", error);
        throw new Error("Ooops something happened while creating the user");
      }
    }
  } catch (error) {
    console.log("error checking user", error);
    throw new Error("Ooops something happened while checking the user");
  }
  return userRef;
};

export const getCurrentUserFromFB = () => {
  try {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  } catch (error) {
    console.log("error checking if there is an user authenticated", error);
    throw new Error("Ooops something happened while checking users");
  }
};

// firebase init
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

// google auth config
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: "select_account" });

export default firebase;
