import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAiIbm6rkegkB7laPynQSMkEKRD_BTxI-M",
    authDomain: "crwn-db-ff56c.firebaseapp.com",
    projectId: "crwn-db-ff56c",
    storageBucket: "crwn-db-ff56c.appspot.com",
    messagingSenderId: "67049790936",
    appId: "1:67049790936:web:07ef2d50db954c7d29e6ad"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch(err) {
      console.log('Error creating user', err);
    }
  }

  return userRef;
}

export const doesUserExistWithEmail = async (email) => {
  const collectioRef = await firestore.collection('users').where('email', '==', email).get();

  return !collectioRef.empty;
}

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;