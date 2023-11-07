import { useState } from "react";

export const useLoading = () => {
  const [loadingCount, setLoadingCount] = useState(0);

  const loading = loadingCount > 0;
  const setLoading = (value = true) => setLoadingCount(value ? loadingCount + 1 : loadingCount - 1);

  return { loading, setLoading };
};
