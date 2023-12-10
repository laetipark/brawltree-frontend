import { useQuery } from 'react-query';
import UserService from '~/services/user.service';

const getResultByKeyword = async (keyword: string) => {
  return UserService.getUsers(keyword);
};

const useResults = (keyword: string) => {
  return useQuery(['keyword', keyword], () => getResultByKeyword(keyword), {
    enabled: !!keyword,
    select: (data) => data,
  });
};

export default useResults;
