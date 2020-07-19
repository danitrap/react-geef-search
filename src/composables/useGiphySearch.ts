import { useState, useEffect } from "react";
import axios from "axios";
import { GiphyResponse } from "../interfaces/giphy";

async function searchGiphy(query: string): Promise<string[]> {
  try {
    return await axios
      .get<GiphyResponse>("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "5Vw5Ns8kZxJxWdlHtGWxUwbmkNulrWiu",
          q: query,
          limit: 9,
          offset: 0,
          rating: "g",
          lang: "en",
        },
      })
      .then((res) => res.data.data.map((gif) => gif.images.preview.mp4));
  } catch (error) {
    return [];
  }
}

export function useGiphySearch(query: string) {
  const [results, setResults] = useState([] as string[]);

  useEffect(() => {
    if (query !== "") {
      searchGiphy(query).then(setResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return results;
}
