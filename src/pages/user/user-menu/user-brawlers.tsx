import React, { useContext, useEffect, useState } from 'react';

import { UserBrawlerSummaryContent } from '~/pages/user/user-menu/user-brawlers/user-brawler-summary';

import { UserService } from '~/services/user.service';
import { UserBrawlersContext, UserContext } from '~/context/user.context';
import { CdnContext } from '~/context/cdn.context';

import styles from '~/assets/styles/pages/user/user-menu/user-brawlers.module.scss';
import { UserBrawlerDetailContent } from '~/pages/user/user-menu/user-brawlers/user-brawler-detail';
import { UserBrawlerComboBox } from '~/components/combo/user-brawler-combo';
import { Spinner } from '~/components/spinner/spinner';

const userRarityOrder = ['Trophy Road', 'Rare', 'Super Rare', 'Epic', 'Mythic', 'Legendary'];

export const UserBrawlersContainer = () => {
  const locales = useContext(CdnContext);

  const context = useContext(UserContext);
  const userBrawlersContext = useContext(UserBrawlersContext);
  const { id, retryBrawlerCount, setRetryBrawlerCount, brawlerLoaded, setBrawlerLoaded } = context;
  const { userWithoutBrawlers, setUserWithoutBrawlers, userOwnedBrawlers, setUserOwnedBrawlers, brawlerItems, setBrawlerItems, brawlerGraphs, setBrawlerGraphs } = userBrawlersContext;

  const [order, setOrder] = useState<string>('currentTrophies');
  const [orderDirection, setOrderDirection] = useState<boolean>(false);
  const setBrawlerOrder = ({ target }) => {
    setOrder(target.value);
    setUserOwnedBrawlers(
      userOwnedBrawlers.sort((a, b) => {
        const nameSort = (locales.brawler['brawler'][`${a.name}`] || '').localeCompare(locales.brawler['brawler'][`${b.name}`] || '');
        const raritySort = userRarityOrder.indexOf(b.rarity) - userRarityOrder.indexOf(a.rarity);

        if (target.value === 'brawlerID') {
          setOrderDirection(false);
          return a.brawlerID.localeCompare(b.brawlerID);
        }

        if (target.value === 'brawlerName') {
          setOrderDirection(false);
          return nameSort;
        }

        if (target.value === 'rarity') {
          setOrderDirection(true);
          if (a.rarity === b.rarity) {
            return nameSort;
          }

          return raritySort;
        }

        if (target.value === 'brawlerPower') {
          setOrderDirection(true);
          if (a.brawlerPower === b.brawlerPower) {
            if (a.rarity === b.rarity) {
              return nameSort;
            }

            return raritySort;
          }

          return b.brawlerPower - a.brawlerPower;
        }

        if (target.value === 'currentTrophies') {
          setOrderDirection(true);
          return b.currentTrophies - a.currentTrophies;
        }

        if (target.value === 'highestTrophies') {
          setOrderDirection(true);
          return b.highestTrophies - a.highestTrophies;
        }
      })
    );
  };

  const setBrawlerOrderDirection = () => {
    setOrderDirection(!orderDirection);
    setUserOwnedBrawlers([...userOwnedBrawlers].reverse());
  };

  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
    }

    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    }
  };

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };

  useEffect(() => {
    if (brawlerLoaded) {
      return;
    }

    const getUserBrawlers = () => {
      UserService.getUserBrawlers({ id }).then((data) => {
        setUserWithoutBrawlers(data.userWithoutBrawlers);
        setUserOwnedBrawlers(data.userOwnedBrawlers);
        setBrawlerItems(data.brawlerItems);
        setBrawlerGraphs(data.brawlerGraphs);

        setRetryBrawlerCount(retryBrawlerCount + 1);
        setBrawlerLoaded(true);
      });
    };

    if (retryBrawlerCount === 0) {
      getUserBrawlers();
    } else if (retryBrawlerCount < 3) {
      setTimeout(() => getUserBrawlers, 1000);
    }
  }, [retryBrawlerCount]);

  return brawlerLoaded ? (
    <div className={styles.brawlersContainer}>
      <div>
        <h2 className={styles.brawlersTitleBox}>
          {locales.user['brawlers']?.ownedBrawlers || 'ownedBrawlers'}
          <span>
            ({userOwnedBrawlers?.length}/{userOwnedBrawlers?.length + userWithoutBrawlers?.length})
          </span>
        </h2>
        <UserBrawlerComboBox order={order} setBrawlerOrder={setBrawlerOrder} orderDirection={orderDirection} setBrawlerOrderDirection={setBrawlerOrderDirection} />
      </div>
      <div className={styles.ownedBrawlersContent}>
        {userOwnedBrawlers?.map(
          ({ brawlerID, name, rarity, brawlerPower, beginTrophies, currentTrophies, highestTrophies, rankedPickRate, trophyPickRate, rankedVictoryRate, trophyVictoryRate, brawlerRank, values }) => {
            const rarityClassName =
              rarity &&
              rarity
                .toLowerCase()
                .split(' ')
                .map((word: string, index: number) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
                .join('');

            return (
              <div key={brawlerID}>
                <UserBrawlerSummaryContent
                  brawlerID={brawlerID}
                  brawlerName={name}
                  brawlerRarity={rarityClassName}
                  brawlerPower={brawlerPower}
                  brawlerRank={brawlerRank}
                  beginTrophies={beginTrophies}
                  currentTrophies={currentTrophies}
                  highestTrophies={highestTrophies}
                  checkedList={checkedList}
                  checkHandler={checkHandler}
                />
                <UserBrawlerDetailContent
                  brawlerID={brawlerID}
                  brawlerRarity={rarityClassName}
                  rankedPickRate={rankedPickRate}
                  trophyPickRate={trophyPickRate}
                  rankedVictoryRate={rankedVictoryRate}
                  trophyVictoryRate={trophyVictoryRate}
                  userBrawlerItems={brawlerItems}
                  brawlerPower={brawlerPower}
                  brawlerValues={values}
                  brawlerGraphs={brawlerGraphs}
                  checkedList={checkedList}
                />
              </div>
            );
          }
        )}
      </div>
      <h2 className={styles.brawlersTitleBox}>
        {locales.user['brawlers']?.withoutBrawlers || 'withoutBrawlers'}
        <span>
          ({userWithoutBrawlers?.length}/{userOwnedBrawlers?.length + userWithoutBrawlers?.length})
        </span>
      </h2>
      <div className={styles.ownedBrawlersContent}>
        {userWithoutBrawlers.map(({ brawlerID, name, rarity }) => {
          return (
            <UserBrawlerSummaryContent
              key={brawlerID}
              brawlerID={brawlerID}
              brawlerName={name}
              brawlerRarity={rarity}
              brawlerPower={null}
              brawlerRank={null}
              beginTrophies={null}
              currentTrophies={null}
              highestTrophies={null}
              checkedList={null}
              checkHandler={null}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <Spinner />
  );
};
