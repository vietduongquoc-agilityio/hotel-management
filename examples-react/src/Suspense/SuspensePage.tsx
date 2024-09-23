import { Suspense, useState } from "react";
import SearchResults from "./Suspense";
import Loading from "../Common/Loading.tsx";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<Loading />}>
        <SearchResults query={query} />
      </Suspense>
    </>
  );
}
