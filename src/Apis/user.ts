import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import uploadFile from "./uploadFiles";

type UserEmailPassword = {
  email: string;
  password: string;
};

type CreateNewUser = {
  userData: object;
  userProfile: object;
} & UserEmailPassword;

type CreateUserAccountParams = {
  userData: object;
  file?: object | null;
  id: string;
};

const createNewUserAccount = async ({
  userData,
  file,
  id,
}: CreateUserAccountParams) => {
  try {
    const docRef = collection(db, "users", id, "personalDetails");
    if (!file) {
      return await addDoc(docRef, {
        ...userData,
      });
    }

    if (file) {
      const uploadPromise = uploadFile(file);
      const downloadURL = await uploadPromise;
      return await addDoc(docRef, {
        ...userData,
        profileUrl: downloadURL,
      });
    }
  } catch (error) {}
};

export const createNewUser = async ({
  email,
  password,
  userData,
  userProfile,
}: CreateNewUser) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        await createNewUserAccount({
          id: user.uid,
          userData: userData,
          file: userProfile,
        });
        console.log(user);
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        throw new Error(errorCode, errorMessage);
        // ..
      });
  } catch (error) {
    console.log(error);
  }
};

/* create new user in Database */

/* log-in user */
export const signInUser = async ({ email, password }: UserEmailPassword) => {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const errorMessage = error;
    console.log(errorMessage);
  }
};

/* Log-out user  */
export const signOutUser = async () => {
  try {
    return signOut(auth);
  } catch (error: any) {
    const errorMessage = error;

    throw new Error(errorMessage);
  }
};

export const getCurrentLoggedInUser = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user.getIdTokenResult().then((idTokenResult) => {
        // });

        resolve(user);
      } else {
        reject("No user logged in");
      }
    });
  });
};

export const getCurrentLoggedInUse = async ({ id }: { id: string }) => {
  try {
    let data: object[] = [];
    const querySnapshot = await getDocs(
      collection(db, "users", id, "personalDetails"),
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const details = {
        ...doc.data(),
        id: doc.id,
      };
      data.push(details);
    });
    // if (docSnap.exists()) return docSnap.data();

    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
