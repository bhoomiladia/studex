import { ThemeProvider as NextThemesProvider, ThemeProviderProps as NextThemesProps } from "next-themes";
import { ReactNode } from "react";

// Extend the props to include `children`
interface ThemeProviderProps extends NextThemesProps {
  children: ReactNode;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
