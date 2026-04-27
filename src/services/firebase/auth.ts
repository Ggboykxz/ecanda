import {
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  ConfirmationResult,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, firestore } from './config';
import type { UserRole } from '../../constants/roles';

export interface AuthUser {
  uid: string;
  email: string | null;
  phone: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
}

export const phoneAuth = {
  sendOTP: async (phone: string): Promise<ConfirmationResult> => {
    const formattedPhone = phone.startsWith('+241') ? phone : `+241${phone}`;
    const confirmation = await signInWithPhoneNumber(auth, formattedPhone);
    return confirmation;
  },

  verifyOTP: async (confirmationResult: ConfirmationResult, code: string) => {
    const result = await confirmationResult.confirm(code);
    return result.user;
  },
};

export const emailAuth = {
  signIn: async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  },

  signUp: async (email: string, password: string, displayName: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName });
    return result.user;
  },

  signOut: async () => {
    await signOut(auth);
  },

  resetPassword: async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  },
};

export const createUserProfile = async (
  firebaseUser: FirebaseUser,
  role: UserRole,
  additionalData?: Record<string, unknown>
) => {
  const userRef = doc(firestore, 'users', firebaseUser.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const userData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      phone: firebaseUser.phoneNumber,
      displayName: firebaseUser.displayName || additionalData?.displayName || 'Utilisateur',
      photoURL: firebaseUser.photoURL || additionalData?.photoURL || null,
      role,
      isVerified: false,
      isActive: true,
      city: additionalData?.city || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...additionalData,
    };

    await setDoc(userRef, userData);
    return userData;
  }

  return userSnap.data();
};

export const getUserProfile = async (uid: string) => {
  const userRef = doc(firestore, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  }
  return null;
};

export const onAuthStateChanged = (callback: (user: AuthUser | null) => void) => {
  return auth.onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser) {
      const userProfile = await getUserProfile(firebaseUser.uid);
      callback({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        phone: firebaseUser.phoneNumber,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        role: userProfile?.role || 'client',
      });
    } else {
      callback(null);
    }
  });
};