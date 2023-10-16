import React from 'react';
import ItemTooltip from '~/components/items/item_info/item_info';

import config from '~/config/config';

import styles from './brawler_detail.module.scss';

const BrawlerDetail = ({
  brawlerID,
  name,
  powerLeaguePickRate,
  trophyLeaguePickRate,
  powerLeagueVictoryRate,
  trophyLeagueVictoryRate,
  brawlerRank,
  userBrawlerItems,
}) => {
  const brawlerGadgets = userBrawlerItems?.filter(
    ({ brawlerID: item, itemKind }) =>
      item === brawlerID && itemKind === 'gadget',
  );
  const brawlerStarPowers = userBrawlerItems?.filter(
    ({ brawlerID: item, itemKind }) =>
      item === brawlerID && itemKind === 'starPower',
  );
  const brawlerGears = userBrawlerItems?.filter(
    ({ brawlerID: item, itemKind }) => item === brawlerID && itemKind === 'gear',
  );

  return (
    <div className={styles.brawlerDetailInfo}>
      <div>
        <img
          src={`${config.assets}/brawlers/profiles/${brawlerID}.webp`}
          alt={'브롤러'}
        />
        <div>
          <img
            className={styles.brawlerModeImage}
            src={`${config.assets}/modes/icon/trophyLeague.webp`}
            alt={'브롤러'}
          />
          <span>Pick</span>
          <span style={{fontWeight: 600}}>{trophyLeaguePickRate}%</span>
        </div>
        <div>
          <img
            className={styles.brawlerModeImage}
            src={`${config.assets}/modes/icon/trophyLeague.webp`}
            alt={'브롤러'}
          />
          <span>Win</span>
          <span style={{fontWeight: 600}}>{trophyLeagueVictoryRate}%</span>
        </div>
        <div>
          <img
            className={styles.brawlerModeImage}
            src={`${config.assets}/modes/icon/powerLeague.webp`}
            alt={'브롤러'}
          />
          <span>Pick</span>
          <span style={{fontWeight: 600}}>{powerLeaguePickRate}%</span>
        </div>
        <div>
          <img
            className={styles.brawlerModeImage}
            src={`${config.assets}/modes/icon/powerLeague.webp`}
            alt={'브롤러'}
          />
          <span>Win</span>
          <span style={{fontWeight: 600}}>{powerLeagueVictoryRate}%</span>
        </div>
      </div>
      <div>
        <div>
          <img
            className={styles.brawlerRankImage}
            src={`${config.assets}/rank/trophy_league/${brawlerRank}.webp`}
            alt={'브롤러'}
          />
          <span className={styles.brawlerName}>{name}</span>
        </div>
        {brawlerGadgets && (
          <div>
            {brawlerGadgets?.map(({ itemID, itemName }) => (
              <ItemTooltip
                key={itemID}
                itemID={itemID}
                itemName={itemName}
                itemKind={'gadget'}
              />
            ))}
          </div>
        )}
        {brawlerStarPowers && (
          <div>
            {brawlerStarPowers?.map(({ itemID, itemName }) => (
              <ItemTooltip
                key={itemID}
                itemID={itemID}
                itemName={itemName}
                itemKind={'starPower'}
              />
            ))}
          </div>
        )}
        {brawlerGears && (
          <div>
            {brawlerGears?.map(({ itemID, itemName }) => (
              <ItemTooltip
                key={itemID}
                itemID={itemID}
                itemName={itemName}
                itemKind={'gear'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrawlerDetail;