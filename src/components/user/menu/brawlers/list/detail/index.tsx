import React, { useContext } from 'react';
import { ItemTooltip } from '~/components/items/item-info';

import { CdnContext } from '~/context/cdn.context';

import config from '~/config/config';

import styles from './index.module.scss';

export const BrawlerDetail = ({
  brawlerID,
  name,
  powerLeaguePickRate,
  trophyLeaguePickRate,
  powerLeagueVictoryRate,
  trophyLeagueVictoryRate,
  brawlerRank,
  userBrawlerItems,
  brawlerPower,
  brawlerValues,
  currentTrophies,
  highestTrophies,
}) => {
  const locales = useContext(CdnContext);

  const brawlerGadgets = userBrawlerItems?.filter(
    ({ brawlerID: item, itemKind }) =>
      item === brawlerID && itemKind === 'gadget',
  );
  const brawlerStarPowers = userBrawlerItems?.filter(
    ({ brawlerID: item, itemKind }) =>
      item === brawlerID && itemKind === 'starPower',
  );
  const brawlerGears = userBrawlerItems?.filter(
    ({ brawlerID: item, itemKind }) =>
      item === brawlerID && itemKind === 'gear',
  );

  return (
    <div className={styles.userBrawlerDetailWrapper}>
      <div>
        <img
          className={styles.brawlerProfile}
          src={`${config.assets}/brawlers/profiles/${brawlerID}.webp`}
          alt={'브롤러'}
        />
        <div className={styles.gameType}>
          <div className={styles.gameTypeTitle}>
            <img
              className={styles.gameTypeImage}
              src={`${config.assets}/modes/icon/trophy.webp`}
              alt={'trophyLeague'}
            />
            <span>{locales.battle['type'].trophy}</span>
          </div>
          <div>
            <span>Pick</span>
            <span style={{ fontWeight: 600 }}>{trophyLeaguePickRate}%</span>
          </div>
          <div>
            <span>Win</span>
            <span style={{ fontWeight: 600 }}>{trophyLeagueVictoryRate}%</span>
          </div>
        </div>
        <div className={styles.gameType}>
          <div className={styles.gameTypeTitle}>
            <img
              className={styles.gameTypeImage}
              src={`${config.assets}/modes/icon/ranked.webp`}
              alt={'브롤러'}
            />
            <span>{locales.battle['type'].ranked}</span>
          </div>
          <div>
            <span>Pick</span>
            <span style={{ fontWeight: 600 }}>{powerLeaguePickRate}%</span>
          </div>
          <div>
            <span>Win</span>
            <span style={{ fontWeight: 600 }}>{powerLeagueVictoryRate}%</span>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.brawlerTitle}>
          <img
            className={styles.brawlerRankImage}
            src={`${config.assets}/rank/trophy/${brawlerRank}.webp`}
            alt={'브롤러'}
          />
          <span className={styles.brawlerName}>{name}</span>
        </div>
        <div className={styles.brawlerSubTitle}>
          <div>
            <span>파워 레벨:</span>
            <span style={{ fontWeight: 600 }}>{brawlerPower}</span>
          </div>
          <div>
            <span>현재 트로피:</span>
            <span style={{ fontWeight: 600 }}>{currentTrophies}</span>
          </div>
          <div>
            <span>최고 트로피:</span>
            <span style={{ fontWeight: 600 }}>{highestTrophies}</span>
          </div>
        </div>
        <div className={styles.userBrawlerStats}>
          {brawlerGadgets && (
            <div>
              {brawlerGadgets?.map(({ itemID, itemName, values }) => (
                <ItemTooltip
                  key={itemID}
                  itemID={itemID}
                  itemName={itemName}
                  itemKind={'gadget'}
                  values={values}
                  brawlerPower={brawlerPower}
                  brawlerValues={brawlerValues}
                />
              ))}
            </div>
          )}
          {brawlerStarPowers && (
            <div>
              {brawlerStarPowers?.map(({ itemID, itemName, values }) => (
                <ItemTooltip
                  key={itemID}
                  itemID={itemID}
                  itemName={itemName}
                  itemKind={'starPower'}
                  values={values}
                  brawlerPower={brawlerPower}
                  brawlerValues={brawlerValues}
                />
              ))}
            </div>
          )}
          {brawlerGears && (
            <div>
              {brawlerGears?.map(({ itemID, itemName, values }) => (
                <ItemTooltip
                  key={itemID}
                  itemID={itemID}
                  itemName={itemName}
                  itemKind={'gear'}
                  values={values}
                  brawlerPower={brawlerPower}
                  brawlerValues={brawlerValues}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
