declare module 'next-themes' {
  import * as React from 'react';

  export interface ThemeProviderProps {
    children?: React.ReactNode;
    attribute?: string;
    defaultTheme?: string;
    enableColorScheme?: boolean;
    enableSystem?: boolean;
    forcedTheme?: string;
    storageKey?: string;
    themes?: string[];
    value?: Record<string, string>;
    disableTransitionOnChange?: boolean;
  }

  export const ThemeProvider: React.ComponentType<ThemeProviderProps>;
}
