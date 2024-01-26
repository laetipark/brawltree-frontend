import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Line } from '@nivo/line';

import BrawlerSummary from '~/components/user/brawlers/list/summary/brawler-summary';
import BrawlerDetail from '~/components/user/brawlers/list/detail/brawler-detail';

import UserService from '~/services/user.service';
import UserContext from '~/context/user-context';

import styles from './brawler-list.module.scss';
import { Spinner } from '~/components/spinner/spinner';

const UserBrawlerList = () => {
  const { t } = useTranslation();

  const context = useContext(UserContext);
  const { id } = context;

  const [brawlers, setBrawlers] = useState([]);
  const [brawlerItems, setBrawlerItems] = useState([]);
  const [brawlerGraphs, setBrawlerGraphs] = useState([]);

  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    UserService.getUserBrawlers({ id }).then((data) => {
      setBrawlers(data.brawlers);
      setBrawlerItems(data.brawlerItems);
      setBrawlerGraphs(data.brawlerGraphs);
    });
  }, [id]);

  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
    }

    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    }
  };

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };

  console.log(brawlers);
  return (
    brawlers?.length > 0 ?
      <div className={styles.brawlerListWrapper}>
        <h1 className={styles.brawlerListTitle}>
          브롤러 정보
          <span>({brawlers?.length}종)</span>
        </h1>
        <div className={styles.brawlerListContent}>
          {brawlers?.map(
            ({
               brawlerID,
               name,
               rarity,
               powerLeaguePickRate,
               trophyLeaguePickRate,
               powerLeagueVictoryRate,
               trophyLeagueVictoryRate,
               beginTrophies,
               currentTrophies,
               highestTrophies,
               brawlerRank,
               brawlerPower,
               values,
             }) => {
              const brawlerData = brawlerGraphs?.filter(
                (item) => item.brawlerID === brawlerID,
              );
              const brawlerGraphData = [
                {
                  id: brawlerID,
                  color: 'hsl(137, 70%, 50%)',
                  data: brawlerData,
                },
              ];
              const brawlerName = t(`brawler.brawler.${name}`);

              return (
                <div key={brawlerID}>
                  <BrawlerSummary
                    brawlerID={brawlerID}
                    name={brawlerName}
                    beginTrophies={beginTrophies}
                    currentTrophies={currentTrophies}
                    highestTrophies={highestTrophies}
                    checkedList={checkedList}
                    checkHandler={checkHandler}
                  />
                  <div
                    className={styles.brawlerDetail}
                    style={{
                      display: checkedList.includes(brawlerID) ? 'flex' : 'none',
                      backgroundColor:
                        rarity === 'Trophy Road'
                          ? '#CDFCF6'
                          : rarity === 'Rare'
                            ? '#C3EDC0'
                            : rarity === 'Super Rare'
                              ? '#BCCEF8'
                              : rarity === 'Epic'
                                ? '#B2A4FF'
                                : rarity === 'Mythic'
                                  ? '#FFB4B4'
                                  : rarity === 'Legendary'
                                    ? '#FDF7C3'
                                    : '',
                      backgroundImage: `linear-gradient(${
                        rarity === 'Chromatic'
                          ? '45deg, #B2A4FF 20%, #FFB4B4 50%, #FDF7C3 80%'
                          : ''
                      })`,
                    }}
                  >
                    <BrawlerDetail
                      brawlerID={brawlerID}
                      name={brawlerName}
                      powerLeaguePickRate={powerLeaguePickRate}
                      trophyLeaguePickRate={trophyLeaguePickRate}
                      powerLeagueVictoryRate={powerLeagueVictoryRate}
                      trophyLeagueVictoryRate={trophyLeagueVictoryRate}
                      brawlerRank={brawlerRank}
                      userBrawlerItems={brawlerItems}
                      brawlerPower={brawlerPower}
                      brawlerValues={values}
                    />
                    {brawlerGraphData[0].data.length > 1 && (
                      <Line
                        data={brawlerGraphData}
                        width={360}
                        height={280}
                        margin={{ top: 20, right: 30, bottom: 48, left: 50 }}
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
                          reverse: false,
                        }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: 'Date',
                          legendOffset: 36,
                          legendPosition: 'middle',
                        }}
                        axisLeft={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legendOffset: -44,
                          legendPosition: 'middle',
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
                        useMesh={true}
                        animate={false}
                      />
                    )}
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div> : <Spinner />
  );
};

export default UserBrawlerList;
