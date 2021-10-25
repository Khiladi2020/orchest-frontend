import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

export const useProjects = ({ shouldFetch }) => {
  const { data, error, ...swr } = useSWR(shouldFetch === false ? null : "/async/projects", fetcher);

  return { isLoading: !data && !error, data, error, ...swr };
};
