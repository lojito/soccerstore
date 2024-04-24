import axios from "axios";
import { useCallback, useState } from "react";
import useMounted from "../useMounted";

function useCreateFavorite(token: string) {
  const isMounted = useMounted();
  const [error, setError] = useState("");

  const updateState = useCallback(
    (newError: string) => {
      if (isMounted()) {
        setError(newError);
      }
    },
    [isMounted]
  );

  const handleCreateFavorite = useCallback(
    async (productId: number) => {
      try {
        await axios.post(
          "http://localhost:4000/api/favorites/",
          { productId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (e) {
        updateState("Un error se produjo al crear un nuevo producto favorito.");
      }
    },
    [token, updateState]
  );

  return { error, handleCreateFavorite };
}

export default useCreateFavorite;
