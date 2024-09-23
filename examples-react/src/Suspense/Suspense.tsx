import { useEffect, useState } from "react";
import Loading from "../Common/Loading.tsx";

interface SearchResultsProps {
  query: string;
}

interface Album {
  id: number;
  title: string;
  artist: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const [results, setResults] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetchSearchResults(query).then((data) => {
        setResults(data);
        setLoading(false);
      });
    }
  }, [query]);

  return (
    <section className="search">
      {loading ? (
        <Loading />
      ) : (
        results.map((albums) => (
          <div key={albums.id}>
            <h3>{albums.title}</h3>
            <p>{albums.artist}</p>
          </div>
        ))
      )}
    </section>
  );
}

async function fetchSearchResults(query: string | number): Promise<Album[]> {
  const response = await fetch(
    `https://66f122ec41537919154fae44.mockapi.io/albums/albums?query=${query}`
  );
  const data = await response.json();
  return data.albums;
}
