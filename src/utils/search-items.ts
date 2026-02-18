import { useQuery } from 'react-query';
import { MainService } from '~/services/main.service';

const getResultByKeyword = (keyword: string) => MainService.getUsersByKeyword(keyword);

export const useSearchItems = (keyword: string) =>
  useQuery(['keyword', keyword], () => getResultByKeyword(keyword), {
    enabled: keyword.length > 1,
    staleTime: 30_000
  });
