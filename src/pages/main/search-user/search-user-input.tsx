import React, { useCallback, useContext } from 'react';
import { SearchContext } from '~/context/search.context';
import { CdnContext } from '~/context/cdn.context';

import styles from '~/assets/styles/pages/main/search-user/search-user-input.module.scss';

export const SearchUserInputBox = ({ onChangeInput }) => {
  const locales = useContext(CdnContext);
  const context = useContext(SearchContext);
  const { onAddSearchHistory } = context;

  const handleEnterKey = useCallback(
    ({ key, currentTarget }: React.KeyboardEvent<HTMLInputElement>) => {
      if (key === 'Enter') {
        onAddSearchHistory(currentTarget.value);
      }
    },
    [onAddSearchHistory]
  );

  return (
    <React.Fragment>
      <img className={styles.searchImage} src={'/images/etc/search.webp'} alt={'search'} />
      <input
        className={styles.searchInput}
        type={'text'}
        name={'search'}
        required={true}
        placeholder={locales.main['input']}
        maxLength={12}
        pattern="#?[O0289PYLQGRJCUVopylqgrjcuv]{3,12}"
        style={{ textTransform: 'uppercase' }}
        autoComplete="off"
        onChange={onChangeInput}
        onKeyDown={handleEnterKey}
      />
      <button className={styles.searchButton} type={'submit'}>
        TREE
      </button>
    </React.Fragment>
  );
};
