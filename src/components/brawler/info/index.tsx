import React, { useContext } from 'react';
import { BrawlerInfoDetail } from '~/components/brawler/info/detail';
import { ItemTooltip } from '~/components/items/item-info';

import { CdnContext } from '~/context/cdn.context';

import config from '~/common/config/config';

import styles from './index.module.scss';

export const BrawlerInfo = ({ brawler, skills, items }) => {
  const locales = useContext(CdnContext);

  const brawlerGadgets = items?.filter(({ kind }) => kind === 'gadget');
  const brawlerStarPowers = items?.filter(({ kind }) => kind === 'starPower');
  const brawlerGears = items?.filter(({ kind }) => kind === 'gear');

  return (
    <div className={styles.brawlerStatsWrapper}>
      <div className={styles.brawlerTitle}>
        <img
          src={`${config.assets}/brawlers/profiles/${brawler.id}.webp`}
          alt={brawler.id}
        />
        <div>
          <h3>{locales.brawler['brawler'][`${brawler.name}`]}</h3>
          <span>{locales.brawler['brawlerRarity'][`${brawler.rarity}`]}</span>
          <span>-</span>
          <span>{locales.brawler['brawlerRole'][`${brawler.role}`]}</span>
        </div>
      </div>
      <div>
        <BrawlerInfoDetail infoDetail={skills.values} />
        <div className={styles.brawlerItemsBox}>
          {brawlerGadgets && (
            <div>
              {brawlerGadgets?.map(({ id, name, values }) => (
                <ItemTooltip
                  key={id}
                  itemID={id}
                  itemName={name}
                  itemKind={'gadget'}
                  values={values}
                  brawlerPower={11}
                  brawlerValues={skills.values}
                />
              ))}
            </div>
          )}
          {brawlerStarPowers && (
            <div>
              {brawlerStarPowers?.map(({ id, name, values }) => (
                <ItemTooltip
                  key={id}
                  itemID={id}
                  itemName={name}
                  itemKind={'starPower'}
                  values={values}
                  brawlerPower={11}
                  brawlerValues={skills.values}
                />
              ))}
            </div>
          )}
          {brawlerGears && (
            <div>
              {brawlerGears?.map(({ id, name, values }) => (
                <ItemTooltip
                  key={id}
                  itemID={id}
                  itemName={name}
                  itemKind={'gear'}
                  values={values}
                  brawlerPower={11}
                  brawlerValues={skills.values}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
