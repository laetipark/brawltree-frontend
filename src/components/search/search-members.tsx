import React, { useEffect, useState } from 'react';

import styles from './search-members.module.scss';

interface InputData {
  name?: string;
}

const SearchMembers = ({ members, setFilterMembers }) => {
  const [keyword, setKeyword] = useState<string>('');

  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const updateData = () => {
    const filter = keyword
      ? members.filter((list: InputData) =>
          new RegExp(`${keyword}.*`, `g`).test(list.name.toLowerCase()),
        )
      : members;
    setFilterMembers(filter);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      updateData();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword, members]); //키워드가 변경되면 api를 호출

  return (
    <div className={styles.searchWrapper}>
      <input
        className={styles.search}
        value={keyword}
        onChange={onChangeData}
      />
      <img src={'/images/etc/search.webp'} alt={'search'} />
    </div>
  );
};

export default SearchMembers;
