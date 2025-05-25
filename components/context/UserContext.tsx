// context/UserContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabaseBrowser } from "@/utils/supabase/client";

interface User {
  id: string;
  email: string;
  user_metadata: {
    avatar?: string;
    name?: string;
  };
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabaseBrowser.auth.getUser();
      setUser(user as User | null);
      setIsLoading(false);
    };

    fetchUser();

    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange((event, session) => {
      setUser(session?.user as User | null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);