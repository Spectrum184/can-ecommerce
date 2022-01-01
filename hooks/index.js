import useSWR from 'swr';

import { getDataAPI } from 'utils/fetch-data';

const fetcher = (url) => getDataAPI(url);

export const useCategory = () => {
  const { data } = useSWR('category', fetcher);

  return data;
};
