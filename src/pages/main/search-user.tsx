import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SearchUserInputBox } from '~/pages/main/search-user/search-user-input';
import { ResultField } from '~/components/main/result-field';
import { SearchHistoryBox } from '~/components/search/search-history-box';

import { CdnContext } from '~/context/cdn.context';
import { SearchContext } from '~/context/search.context';
import { debounce } from '~/utils/debounce';

import styles from '~/assets/styles/pages/main/search-user.module.scss';

export const SearchUserContainer = () => {
  const locales = useContext(CdnContext);

  const searchContext = useContext(SearchContext);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>('');
  const [toggle, setToggle] = useState(false);

  const { searchHistory, setSearchHistory } = searchContext;

  /** Function related to searching by nickname OR user tag */
  const handleChangeInputValue = debounce((target: { value: string }) => {
    const { value } = target;
    target.value = value.replace('#', '');
    setInputValue(value.replace('#', ''));
  }, 200);

  const handleChangeInput = ({ target }) => {
    handleChangeInputValue(target);
  };

  const handleClearSearchHistory = () => {
    if (window.confirm(locales.main['searchUserContainer']?.checkClearSearch || 'checkClearSearch')) {
      setSearchHistory([]);
    }
  };

  return (
    <div className={styles.searchUserContainer}>
      <h2>{locales.main['searchProfile'] || 'searchProfile'}</h2>
      <form
        onSubmit={(e) => {
          navigate(`/brawlian/${e.target[0].value.toUpperCase()}`);
        }}
      >
        <SearchUserInputBox onChangeInput={handleChangeInput} />
        <ResultField inputValue={inputValue} onChangeInputValue={setInputValue} setToggle={setToggle} />
      </form>
      <div className={styles.recentSearch}>
        <h2 className={styles.recentSearchTitle}>{locales.main['searchUserContainer']?.recentSearch || 'recentSearch'}</h2>
        <SearchHistoryBox searchHistory={searchHistory} />
        <div className={styles.clearSearch}>
          <div onClick={handleClearSearchHistory}>{locales.main['searchUserContainer']?.clearSearch || 'clearSearch'}</div>
        </div>
      </div>
      <div className={styles.findTagToggle}>
        <div onClick={() => setToggle(!toggle)}>
          <FontAwesomeIcon
            icon={faAngleRight}
            style={{
              transform: toggle ? 'rotate(90deg)' : '',
              transition: 'transform 0.3s ease'
            }}
          />
          <span>{locales.main['findTag']}</span>
        </div>
        {toggle && <img className={styles.howToFindTag} src={'/images/help/find_tag_kr.webp'} alt={'find_tag'} />}
      </div>
    </div>
  );
};
