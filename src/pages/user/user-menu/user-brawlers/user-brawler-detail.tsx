import React, { useContext } from 'react';
import { Line } from '@nivo/line';

import { ItemTooltip } from '~/components/items/item-info';

import { CdnContext } from '~/context/cdn.context';

import config from '~/common/config/config';

import defStyles from '~/common/styles/app.module.scss';
import styles from '~/assets/styles/pages/user/user-menu/user-brawlers/user-brawler-detail.module.scss';

export const UserBrawlerDetailContent = ({
  brawlerID,
  brawlerRarity,
  rankedPickRate,
  trophyPickRate,
  rankedVictoryRate,
  trophyVictoryRate,
  userBrawlerItems,
  brawlerPower,
  brawlerValues,
  brawlerGraphs,
  checkedList
}) => {
  const locales = useContext(CdnContext);

  const brawlerGadgets = userBrawlerItems?.filter(({ brawlerID: item, itemKind }) => item === brawlerID && itemKind === 'gadget');
  const brawlerStarPowers = userBrawlerItems?.filter(({ brawlerID: item, itemKind }) => item === brawlerID && itemKind === 'starPower');
  const brawlerGears = userBrawlerItems?.filter(({ brawlerID: item, itemKind }) => item === brawlerID && itemKind === 'gear');
  const brawlerData = brawlerGraphs?.filter((item) => item.brawlerID === brawlerID);
  const brawlerGraphData = [
    {
      id: brawlerID,
      color: 'hsl(137, 70%, 50%)',
      data: brawlerData
    }
  ];

  return (
    <div className={`${styles.userBrawlerDetailContent} ${defStyles[`${brawlerRarity}Background`]}`} style={{ display: checkedList.includes(brawlerID) ? 'flex' : 'none' }}>
      <div>
        <h4>{locales.user['brawlers']?.items || 'items'}</h4>
        {brawlerGadgets && (
          <div>
            {brawlerGadgets?.map(({ itemID, itemName, values }) => (
              <ItemTooltip key={itemID} itemID={itemID} itemName={itemName} itemKind={'gadget'} values={values} brawlerPower={brawlerPower} brawlerValues={brawlerValues} />
            ))}
          </div>
        )}
        {brawlerStarPowers && (
          <div>
            {brawlerStarPowers?.map(({ itemID, itemName, values }) => (
              <ItemTooltip key={itemID} itemID={itemID} itemName={itemName} itemKind={'starPower'} values={values} brawlerPower={brawlerPower} brawlerValues={brawlerValues} />
            ))}
          </div>
        )}
        {brawlerGears && (
          <div>
            {brawlerGears?.map(({ itemID, itemName, values }) => (
              <ItemTooltip key={itemID} itemID={itemID} itemName={itemName} itemKind={'gear'} values={values} brawlerPower={brawlerPower} brawlerValues={brawlerValues} />
            ))}
          </div>
        )}
      </div>
      <div>
        <img src={`${config.assets}/modes/icon/trophy.webp`} alt={locales.battle['type']?.trophy} />
        <h4>{locales.battle['type']?.trophy || 'trophy'}</h4>
        <div>
          <span>{locales.application['pick'] || 'pick'}</span>
          <span>{trophyPickRate}%</span>
        </div>
        <div>
          <span>{locales.application['win'] || 'win'}</span>
          <span>{trophyVictoryRate}%</span>
        </div>
      </div>
      <div>
        <img src={`${config.assets}/modes/icon/ranked.webp`} alt={locales.battle['type']?.ranked} />
        <h4>{locales.battle['type']?.ranked || 'ranked'}</h4>
        <div>
          <span>{locales.application['pick'] || 'pick'}</span>
          <span>{rankedPickRate}%</span>
        </div>
        <div>
          <span>{locales.application['win'] || 'win'}</span>
          <span>{rankedVictoryRate}%</span>
        </div>
      </div>
      {brawlerGraphData[0].data.length > 1 && (
        <Line
          data={brawlerGraphData}
          width={280}
          height={240}
          margin={{ top: 12, right: 16, bottom: 40, left: 52 }}
          yFormat=" >-.0f"
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min:
              brawlerData
                ?.map((item) => item.y)
                .reduce((a, b) => {
                  return Math.min(a, b);
                }) - 40,
            max:
              brawlerData
                ?.map((item) => item.y)
                .reduce((a, b) => {
                  return Math.max(a, b);
                }) + 40,
            stacked: true,
            reverse: false
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 4,
            tickPadding: 4,
            tickRotation: 0,
            legend: locales.application['date'] || 'date',
            legendOffset: 32,
            legendPosition: 'middle'
          }}
          axisLeft={{
            tickSize: 8,
            tickPadding: 4,
            tickRotation: 0,
            legend: locales.user['records']?.trophies || 'trophies',
            legendOffset: -44,
            legendPosition: 'middle'
          }}
          colors={{ scheme: 'category10' }}
          enableArea={true}
          areaBaselineValue={
            brawlerData
              ?.map((item) => item.y)
              .reduce((a, b) => {
                return Math.min(a, b);
              }) - 40
          }
          pointSize={8}
          pointColor={{ from: 'color' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          enablePointLabel={true}
          useMesh={true}
          animate={false}
          isInteractive={false}
        />
      )}
    </div>
  );
};
