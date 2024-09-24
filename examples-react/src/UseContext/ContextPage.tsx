import { createContext, ReactNode, useContext, useState } from "react";

const ThemeContext = createContext("light");

interface PanelProps {
  title: string;
  children: ReactNode;
}

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function UseContextPage() {
  const [theme, setTheme] = useState("light");
  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        width: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThemeContext.Provider value={theme}>
        <Form />
        <Button
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          Toggle theme
        </Button>
      </ThemeContext.Provider>
    </div>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }: PanelProps) {
  const theme = useContext(ThemeContext);
  const className = "panel-" + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({ children, onClick }: ButtonProps) {
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
