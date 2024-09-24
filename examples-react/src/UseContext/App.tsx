import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedComponent() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("ThemedComponent must be used within a ThemeProvider");
  }

  const { theme, setTheme } = context;

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        width: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <p>Current theme: {theme}</p>
      <button 
        style={{
            width: 100,
            height: 50,
        }}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}

export default function AppDL() {
  return (
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  );
}
