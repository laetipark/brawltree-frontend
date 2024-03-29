import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InputField } from '~/components/main/input-field';
import { ResultField } from '~/components/main/result-field';
import { SearchHistoryBox } from '~/components/search/search-history-box';

import { SearchItemType } from '~/common/type/main.type';
import { SearchContext } from '~/context/search.context';
import { debounce } from '~/utils/debounce';

import styles from './index.module.scss';
import { EventsSummary } from '~/components/main/events';
import EventService from '~/services/event.service';

export const Main = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>('');
  const [toggle, setToggle] = useState(false);
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem('searchHistory') || '[]'),
  );
  const [events, setEvents] = useState([]);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    EventService.getTLCurrentEvents()
      .then((data) => setEvents(data));
  }, []);

  /** Function related to searching by nickname OR user tag */
  const handleChangeInputValue = debounce((target: { value: string; }) => {
    const { value } = target;
    target.value = value.replace('#', '');
    setInputValue(value.replace('#', ''));
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
    const nextKeyword = searchHistory.filter((item: SearchItemType) => {
      return userIDs.includes(item.userID);
    });
    if (searchHistory.length !== nextKeyword.length) {
      setSearchHistory(nextKeyword);
    }
  };

  const handleRemoveSearchItem = (userID: string) => {
    const nextKeyword = searchHistory.filter((user: SearchItemType) => {
      return user.userID != userID;
    });
    setSearchHistory(nextKeyword);
  };

  const handleClearSearchHistory = () => {
    if (window.confirm(t('main.checkClearSearch'))) {
      setSearchHistory([]);
    }
  };

  return (
    <div className={styles.app}>
      <SearchContext.Provider
        value={{
          onAddSearchHistory: handleAddSearchItem,
          onFilterSearchItem: handleFilterSearchItem,
          onRemoveSearchItem: handleRemoveSearchItem,
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
            <div className={styles.clearSearch}>
              <div
                onClick={handleClearSearchHistory}
              >
                {t('main.clearSearch')}
              </div>
            </div>
          </div>
        </div>
      </SearchContext.Provider>
      <div className={styles.eventSummary}>
        <EventsSummary events={events} />
      </div>
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
