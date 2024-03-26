import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InputField } from '~/components/main/input-field';
import { ResultField } from '~/components/main/result-field';
import { SearchHistoryBox } from '~/components/search/search-history-box';

import { SearchContext } from '~/context/search.context';
import { debounce } from '~/utils/debounce';
import styles from './index.module.scss';

export const Main = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>('');
  const [toggle, setToggle] = useState(false);
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem('searchHistory') || '[]'),
  );

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  /** Function related to searching by nickname OR user tag */
  const handleChangeInputValue = debounce((target) => {
    const { value } = target;
    console.log(value);
    if (value.length > 1) {
      target.value = value.replace('#', '');
      setInputValue(value.replace('#', ''));
    }
  }, 200);

  const handleChangeInput = ({ target }) => {
    handleChangeInputValue(target);
  };

  /** Function related to recent search */
  const handleAddSearchItem = (userID: string) => {
    const user = searchHistory.find((user) => user.id === userID);
    if (!user) {
      const searchItem = {
        id: Date.now(),
        userID: userID,
      };
      setSearchHistory([searchItem, ...searchHistory]);
    }
  };

  const handleFilterSearchItem = (userIDs: string[]) => {
    const nextKeyword = searchHistory.filter((item) => {
      return userIDs.includes(item.userID);
    });
    if (searchHistory.length !== nextKeyword.length) {
      setSearchHistory(nextKeyword);
    }
  };

  const handleRemoveSearchItem = (userID: string) => {
    const nextKeyword = searchHistory.filter((user) => {
      return user.userID != userID;
    });
    setSearchHistory(nextKeyword);
  };

  const handleClearSearchHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className={styles.app}>
      <SearchContext.Provider
        value={{
          onAddSearchHistory: handleAddSearchItem,
          onFilterSearchItem: handleFilterSearchItem,
          onRemoveSearchItem: handleRemoveSearchItem,
          onClearSearchHistory: handleClearSearchHistory,
        }}>
        <form
          className={styles.inputBox}
          onSubmit={(e) => {
            navigate(`/brawlian/${e.target[0].value.toUpperCase()}`);
          }}
        >
          <InputField onChangeInput={handleChangeInput} />
          <ResultField
            inputValue={inputValue}
            onChangeInputValue={setInputValue}
            setToggle={setToggle}
          />
        </form>
        <div>
          <div className={styles.recentSearch}>
            <div className={styles.recentSearchTitle}>
              {t('main.recentSearch')}
            </div>
            <SearchHistoryBox
              searchHistory={searchHistory}
            />
          </div>
        </div>
      </SearchContext.Provider>
      <div className={styles.findTagToggle}>
        <h3 onClick={() => setToggle(!toggle)}>
          <FontAwesomeIcon
            icon={faAngleRight}
            style={{
              transform: toggle ? 'rotate(90deg)' : '',
              transition: 'transform 0.3s ease',
            }}
          />
          <span>{t('main.findTag')}</span>
        </h3>
        {toggle && (
          <img
            className={styles.howToFindTag}
            src={'/images/help/find_tag_kr.webp'}
            alt={'find_tag'}
          />
        )}
      </div>
    </div>
  );
};
