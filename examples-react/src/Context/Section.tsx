import { ReactNode, useContext } from "react";
import { LevelContext } from "./LevelContext";

interface SectionProps {
  children: ReactNode;
}

export default function Section({ children }: SectionProps) {
    const level = useContext(LevelContext);
    return (
      <section className="section">
        <LevelContext.Provider value={level + 1}>
          {children}
        </LevelContext.Provider>
      </section>
    );
  }
