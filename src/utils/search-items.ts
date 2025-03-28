import { useQuery } from 'react-query';
import { MainService } from '~/services/main.service';

const getResultByKeyword = async (keyword: string) => {
  return MainService.getUsersByKeyword(keyword);
};

export const searchItems = (keyword: string) =>
  useQuery(['keyword', keyword], () => getResultByKeyword(keyword), {
    enabled: !!keyword,
    select: (data) => keyword.length > 1 ? data : null,
  });

