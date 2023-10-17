import { auth, GoogleProvider } from "@/firebaseConfig";
import { signInWithRedirect, signOut } from "firebase/auth";

export const login = () => {
    signInWithRedirect(auth, GoogleProvider)
}

export const logout = () => {
    signOut(auth);
}