"use client";

import { createContext, useContext, useRef, ReactNode } from "react";

interface AnimationContextType {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

const AnimationContext = createContext<AnimationContextType | null>(null);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <AnimationContext.Provider value={{ scrollRef }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const ctx = useContext(AnimationContext);
  if (!ctx) throw new Error("useAnimation must be used within AnimationProvider");
  return ctx;
}
