"use client";

import React, { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter, usePathname } from "next/navigation";
import { Access } from "@/enums/AccessEnum";
import { FAQType } from "@/types/FAQType";
import { User, UserSession } from "@/db/schema";
import { getRoleFromString, createUserSession } from "@/utils/roleAccess";
import { toast } from "react-toastify";

const AuthContext = createContext<{
  firebaseUser: FirebaseUser | null;
  user: User | null;
  userSession: UserSession | null;
  access: Access;
  root: FAQType[];
  loading: boolean;
  hasAccess: (module: string) => boolean;
} | null>(null);

function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [firebaseUser, setFirebaseUser] = useState<null | FirebaseUser>(null);
  const [user, setUser] = useState<null | User>(null);
  const [userSession, setUserSession] = useState<null | UserSession>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const path = usePathname();
  const [access, setAccess] = useState<Access>(Access.Support);
  const [root, setRoot] = useState<FAQType[]>([]);
  const [hasFetchedUser, setHasFetchedUser] = useState(false);

  // Fetch user data from API when Firebase user changes
  const fetchUserData = async (firebaseUser: FirebaseUser) => {
    if (hasFetchedUser) return; // Prevent multiple calls
    
    try {
      setHasFetchedUser(true);
      const response = await fetch("/api/admin/users/me", {
        method: "GET",
        headers: {
          "x-firebase-uid": firebaseUser.uid,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.error("User not found in database or inactive");
          toast.error("User account not found or has been deactivated. Please contact administrator.");
        } else {
          console.error("Error fetching user data:", response.statusText);
          toast.error("Failed to load user data. Please try again.");
        }
        await auth.signOut();
        return;
      }

      const userData = await response.json();
      setUser(userData);
      const roleAccess = getRoleFromString(userData.role);
      setAccess(roleAccess);
      setUserSession(createUserSession(userData));
      
      // Set cookies for middleware access
      document.cookie = `userRole=${userData.role}; path=/; secure; samesite=strict`;
      document.cookie = `firebaseAuthToken=${await firebaseUser.getIdToken()}; path=/; secure; samesite=strict`;
      
      // Only show toast if navigating from the auth page
      if (path?.includes("/auth")) {
        toast.success(`Welcome back, ${userData.name}!`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Network error. Please check your connection and try again.");
      await auth.signOut();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      
      if (firebaseUser) {
        setFirebaseUser(firebaseUser);
        if (!hasFetchedUser) {
          await fetchUserData(firebaseUser);
        }
        if (path?.includes("/auth")) {
          router.push("/admin/dashboard");
        }
      } else {
        if (user) {
          toast.info("You have been logged out successfully.");
        }
        setFirebaseUser(null);
        setUser(null);
        setUserSession(null);
        setAccess(Access.Support);
        setHasFetchedUser(false);
        
        // Clear cookies
        document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'firebaseAuthToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        
        if (path?.includes("/admin") && !path?.includes("/auth")) {
          router.push("/admin/auth");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [path, router]); // Removed user from dependencies to prevent loop

  const hasAccess = (module: string) => {
    if (!userSession) return false;
    return userSession.modules.includes(module);
  };

  async function getFAQs() {
    console.log("%cFetching in Admin Context", "color:red;font-size: 30px");
    setRoot(() => []);
    // Note: This is using Firebase Firestore, you might want to migrate this to Supabase as well
    try {
      const { collection, getDocs } = await import("firebase/firestore");
      const { db } = await import("@/firebase");
      const querySnapshot = await getDocs(collection(db, "faq"));
      querySnapshot.forEach((doc: any) => {
        setRoot((org: any) => {
          return [...org, doc.data()];
        });
      });
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      toast.error("Failed to load FAQs. Some features may not work properly.");
    }
  }

  useEffect(() => {
    if (user && !root.length) {
      getFAQs();
    }
  }, [user, root.length]);

  return (
    <AuthContext.Provider value={{ 
      firebaseUser, 
      user, 
      userSession, 
      access, 
      root, 
      loading, 
      hasAccess 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

export default function useAuth() {
  return useContext(AuthContext);
}
