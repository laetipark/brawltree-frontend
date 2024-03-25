import { useQuery } from 'react-query';
import { UserService } from '~/services/user.service';

const getResultByKeyword = async (keyword: string) => {
  return UserService.getUsersByNickname(keyword);
};

export const searchItems = (keyword: string) => {
  return useQuery(['keyword', keyword], () => getResultByKeyword(keyword), {
    enabled: !!keyword,
    select: (data) => data,
  });
};
