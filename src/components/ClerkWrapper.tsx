"use client";

import { useEffect, useState } from "react";

interface ClerkWrapperProps {
  children: React.ReactNode;
}

export function ClerkWrapper({ children }: ClerkWrapperProps) {
  const [ClerkProvider, setClerkProvider] = useState<React.ComponentType<any> | null>(null);
  const [darkTheme, setDarkTheme] = useState<any>(null);
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    const hasClerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

    if (hasClerkKey) {
      // Dynamically import Clerk components only when configured
      Promise.all([
        import("@clerk/nextjs"),
        import("@clerk/themes"),
      ]).then(([clerkModule, themesModule]) => {
        setClerkProvider(() => clerkModule.ClerkProvider);
        setDarkTheme(themesModule.dark);
        setIsConfigured(true);
      }).catch(() => {
        // If imports fail, proceed without Clerk
        setIsConfigured(false);
      });
    } else {
      setIsConfigured(false);
    }
  }, []);

  // While checking configuration, render children without wrapper
  // This prevents flash of loading state
  if (isConfigured === null) {
    return <>{children}</>;
  }

  // If Clerk isn't configured or available, render without wrapper
  if (!isConfigured || !ClerkProvider) {
    return <>{children}</>;
  }

  // Render with Clerk provider
  return (
    <ClerkProvider
      appearance={{
        baseTheme: darkTheme,
        variables: {
          colorPrimary: "#6366f1",
          colorBackground: "#0a0a0f",
          colorInputBackground: "#1a1a2e",
          colorInputText: "#e5e7eb",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
