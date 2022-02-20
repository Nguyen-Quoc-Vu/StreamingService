import { useEffect, useState } from "react";
import { getUser } from "../firebase/firebase";

export const useUserData = (id) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUser
      .then((response) => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  return { data, error, loading };
};
