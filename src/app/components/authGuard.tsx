"use client";
// ** React Imports
import { ReactNode, ReactElement, useEffect } from "react";

// ** Next Import
import { usePathname, useRouter } from "next/navigation";

// ** Hooks Import


import { Storage } from "../services/storage";

import LoginPage from "../login/page";
import { useAuth } from "../context/authContext";



interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const storage = Storage.getInstance();

  useEffect(
    () => {
      // if (!router.isReady) {
      //   return;
      // }

      if (!storage.getSessionToken()) {
        if (pathname !== "/") {
          // router.replace({
          //   pathname: "/login",
          //   query: { returnUrl: router.asPath },
          // });
          router.replace("/login");
        } else {
          router.replace("/login");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router]
  );

  if (auth.user === null && !auth.loading) {
    return <LoginPage />;
  }

  if (auth.loading) {
    return <></>;
  }

  return <>{children}</>;
};

export default AuthGuard;
