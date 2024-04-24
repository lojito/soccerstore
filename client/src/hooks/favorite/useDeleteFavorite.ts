import axios from "axios";
import { useCallback, useState } from "react";
import useMounted from "../useMounted";

interface DeleteFavorite {
  productId: number;
  error: boolean;
}

function useDeleteFavorite(token: string) {
  const isMounted = useMounted();
  const [state, setState] = useState<DeleteFavorite>({
    productId: 0,
    error: false,
  });

  const updateState = useCallback(
    (newState: DeleteFavorite) => {
      if (isMounted()) {
        setState({ ...newState });
      }
    },
    [isMounted]
  );

  const handleDeleteFavorite = useCallback(
    async (productId: number) => {
      try {
        await axios.delete(`http://localhost:4000/api/favorites/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        updateState({
          productId,
          error: false,
        });
      } catch (e) {
        updateState({
          productId,
          error: true,
        });
      }
    },
    [token, updateState]
  );

  return { ...state, handleDeleteFavorite };
}

export default useDeleteFavorite;
