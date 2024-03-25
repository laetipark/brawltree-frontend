import React, { useContext, useEffect, useState } from 'react';
import { UserService } from '~/services/user.service';
import { SearchItem } from '~/components/search/search-item';
import { SearchContext } from '~/context/search.context';

import styles from './index.module.scss';

export const SearchHistoryBox = ({ searchHistory }) => {
  const [historyUsers, setHistoryUsers] = useState([]);
  const context = useContext(SearchContext);
  const { onFilterSearchItem, onRemoveSearchItem, onClearSearchHistory } = context;

  useEffect(() => {
    const userIDs = searchHistory.map(item => item.userID);
    UserService.getUsersByUserIDs(userIDs)
      .then(data => {
        const userIDs = data.map(user => user.userID);
        onFilterSearchItem(userIDs);
        setHistoryUsers(data);
      });
  }, [searchHistory]);

  return (
    <ul className={styles.SearchHistoryWrapper}>
      {
        historyUsers.map(user => {
          return (
            <SearchItem
              key={user.userID}
              user={user}
              onAddSearchHistory={null}
              onRemoveSearchItem={onRemoveSearchItem}
            />
          );
        })
      }
    </ul>
  );
};