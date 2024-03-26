import React, { useContext, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { SearchItem } from '~/components/search/search-item';
import { SearchContext } from '~/context/search.context';
import { searchItems } from '~/utils/search-items';
import { useWindowClick } from '~/hooks/use-window-click.hook';

import styles from './index.module.scss';

export const ResultField = ({ inputValue, onChangeInputValue, setToggle }) => {
  const context = useContext(SearchContext);
  const { onAddSearchHistory } = context;
  const { status, data } = searchItems(inputValue);
  const dropDownRef = useRef();
  const [checked, setChecked] = useWindowClick(dropDownRef, false);

  useEffect(() => {
    if (inputValue.length > 1) {
      setChecked(true);
    }
  }, [inputValue]);

  const getDataByStatus = () => {
    switch (status) {
      case 'loading':
        return <div>Loading</div>;
      default:
        return (
          <ul>
            {data?.map((user) => {
              return (
                <SearchItem
                  key={user.userID}
                  user={user}
                  onAddSearchHistory={onAddSearchHistory}
                  onRemoveSearchItem={null}
                />
              );
            })}
            <li>
              <div
                className={styles.addAccount}
                onClick={() => {
                  onChangeInputValue('');
                  setToggle(true);
                }}
              >
                <div>
                  <img src={'/images/etc/random.webp'} alt={'random'} />
                  <div>
                    <div>찾는 계정이 없으신가요?</div>
                    <div>유저 태그를 입력하세요!</div>
                  </div>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    height={40}
                  />
                </div>
              </div>
            </li>
          </ul>
        );
    }
  };

  return data ? (
    <div
      className={styles.resultFieldWrapper}
      style={{ display: `${checked ? 'flex' : 'none'}` }}
      ref={dropDownRef}
    >
      {getDataByStatus()}
    </div>
  ) : null;
};