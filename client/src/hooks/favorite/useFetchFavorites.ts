import axios from "axios";
import { Dispatch, useCallback, useState } from "react";
import { UnknownAction } from "redux";
import { fetchFavorites } from "../../actions/favorite";
import useMounted from "../useMounted";

interface FetchedFavorites {
  error: boolean;
  isFetching: boolean;
}

function useFetchFavorites(token: string, dispatch: Dispatch<UnknownAction>) {
  const isMounted = useMounted();
  const [state, setState] = useState<FetchedFavorites>({
    error: false,
    isFetching: false,
  });

  const updateState = useCallback(
    (newState: FetchedFavorites) => {
      if (isMounted()) {
        setState({ ...newState });
      }
    },
    [isMounted]
  );

  const handleFetchFavorites = useCallback(async () => {
    try {
      updateState({ error: false, isFetching: true });
      const res = await axios.get("http://localhost:4000/api/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(fetchFavorites(res.data));
      updateState({ error: false, isFetching: false });
    } catch (e) {
      updateState({
        error: true,
        isFetching: false,
      });
    }
  }, [token, updateState, dispatch]);

  return { ...state, handleFetchFavorites };
}

export default useFetchFavorites;
