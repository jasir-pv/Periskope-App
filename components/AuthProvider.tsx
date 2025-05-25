// // components/AuthProvider.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { createContext, useContext } from "react";
// import { supabaseBrowser } from "@/utils/supabase/client";
// import { useRouter } from "next/navigation";

// type AuthContextType = {
//   user: any;
//   isLoading: boolean;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange((event, session) => {
//       setUser(session?.user ?? null);
//       setIsLoading(false);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };