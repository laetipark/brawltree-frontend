import React from 'react';
import { useTranslation } from 'react-i18next';

import config from '~/config/config';

import styles from './index.module.scss';
import ItemTooltip from '~/components/items/detail/item-info';

export const BrawlerInfo = ({ brawler, skills, items }) => {
  const { t } = useTranslation();

  const brawlerGadgets = items?.filter(
    ({ kind }) => kind === 'gadget',
  );
  const brawlerStarPowers = items?.filter(
    ({ kind }) => kind === 'starPower',
  );
  const brawlerGears = items?.filter(
    ({ kind }) => kind === 'gear',
  );

  type ValueType = number | string | object;
  const renderData = (obj: ValueType, indent = '0') => {
    return Object.entries(obj).map(([key, value]) => {
      console.log(indent, key);
      if (typeof value === 'object' && value !== null) {
        return (
          <div key={key}
               style={{ paddingLeft: indent }}>
            <strong>{key}: {value.name}</strong>
            {renderData(value, '8px')}
          </div>
        );
      } else if (key !== 'name') {
        return (
          <div key={key}
               style={{ paddingLeft: indent }}>
            {key}: {value}
          </div>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className={styles.brawlerStatsWrapper}>
      <div className={styles.brawlerTitle}>
        <img src={`${config.assets}/brawlers/profiles/${brawler.id}.webp`}
             alt={brawler.id} />
        <div>
          <h3>{t(`brawler.brawler.${brawler.name}`)}</h3>
          <span>{t(`brawler.brawlerRarity.${brawler.rarity}`)}</span>
          <span>-</span>
          <span>{t(`brawler.brawlerRole.${brawler.role}`)}</span>
        </div>
      </div>
      <div>
        <div>
          {renderData(skills.values)}
        </div>
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
                  brawlerValues={values}
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
                  brawlerValues={values}
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
                  brawlerValues={values}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
