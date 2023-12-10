import React from 'react';
import { Link } from 'react-router-dom';

import useResults from '~/utils/search-items';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import config from '~/config/config';
import styles from './result-field.module.scss';

const roman = ['I', 'II', 'III'];

const ResultField = ({ inputValue, setInputValue, setToggle }) => {
  const { status, data } = useResults(inputValue);

  const getDataByStatus = () => {
    switch (status) {
      case 'loading':
        return <div>Loading</div>;
      default:
        return (
          <ul>
            {data?.map((user) => {
              return (
                <li key={user.userID} value={user.userName}>
                  <Link
                    className={styles.searchItem}
                    to={`/brawlian/${user.userID.replace('#', '')}`}
                  >
                    <img
                      className={styles.image}
                      src={`${config.assets}/brawlian/profile/${user.profileIcon}.webp`}
                      alt={user.profileIcon}
                    />
                    <div>
                      <div className={styles.searchItemTitle}>
                        <span>{user.userName}</span>
                      </div>
                      <div className={styles.searchItemTitle}>
                        <span className={styles.searchItemTag}>
                          {user.userID}
                        </span>
                      </div>
                      <div className={styles.searchItemContent}>
                        <span className={styles.searchItemTL}>
                          <img
                            src={`${config.assets}/modes/icon/trophyLeague.webp`}
                            alt={'trophyLeague'}
                          />
                          {user.currentTrophies}
                        </span>
                        <span className={styles.searchItemPLS}>
                          <img
                            src={`${
                              config.assets
                            }/rank/power_league/${Math.floor(
                              user.currentSoloPL / 3,
                            )}.webp`}
                            alt={Math.floor(user.currentSoloPL / 3).toString()}
                          />
                          {roman[user.currentSoloPL % 3]}
                        </span>
                        <span className={styles.searchItemPLT}>
                          <img
                            src={`${
                              config.assets
                            }/rank/power_league/${Math.floor(
                              user.currentTeamPL / 3,
                            )}.webp`}
                            alt={Math.floor(user.currentTeamPL / 3).toString()}
                          />
                          {roman[user.currentTeamPL % 3]}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
            <li>
              <div
                className={styles.addAccount}
                onClick={() => {
                  setInputValue('');
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
    <div className={styles.resultFieldWrapper}>{getDataByStatus()}</div>
  ) : null;
};

export default ResultField;
