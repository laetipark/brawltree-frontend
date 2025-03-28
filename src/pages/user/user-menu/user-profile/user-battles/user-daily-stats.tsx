import React, { useContext, useEffect, useState } from 'react';
import { TimeRange } from '@nivo/calendar';

import { UserBrawlerStatsBox } from '~/pages/user/user-menu/user-profile/user-battles/user-brawler-stats';
import { CdnContext } from '~/context/cdn.context';
import { UserDailyBrawlersType } from '~/common/types/users.type';

import defStyles from '~/common/styles/app.module.scss';
import styles from '~/assets/styles/pages/user/user-menu/user-profile/user-battles/user-daily-battles.module.scss';

export const UserDailyStatsBox = ({ summaryBattles, dailyBrawlers, season }) => {
  const locales = useContext(CdnContext);

  const [dailyBrawlerItem, setDailyBrawlerItem] = useState<UserDailyBrawlersType[]>([]);
  const [dailyBrawlerDate, setDailyBrawlerDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

  const colors = ['#9DC08B', '#609966', '#557153', '#40513B'];
  const beginDate = new Date(new Date(season?.beginDate).getTime() - 1000 * 60 * 60 * 24);
  const fromDateYear = beginDate.getFullYear();
  const fromDateMonth = ('0' + (beginDate.getMonth() + 1)).slice(-2);
  const fromDateDay = ('0' + beginDate.getDate()).slice(-2);

  const fromDate = `${fromDateYear}-${fromDateMonth}-${fromDateDay}`;

  useEffect(() => {
    if (!dailyBrawlers.length) {
      return;
    }

    const dateItem: {
      date: Date;
      brawlers: UserDailyBrawlersType[];
    } = dailyBrawlers.find(({ date }) => new Date(date).getTime() === dailyBrawlerDate.getTime());

    setDailyBrawlerItem(dateItem ? dateItem.brawlers : []);
  }, [dailyBrawlers, dailyBrawlerDate]);

  return (
    <div className={styles.userDailyStatsBox}>
      <div className={styles.userDailyStatsGraphBox}>
        <h3>{locales.user['battle']?.dailyBattles || 'dailyBattles'}</h3>
        <div className={styles.selectedDate}>
          ({dailyBrawlerDate.toLocaleDateString()} {locales.application['selected'] || 'selected'})
        </div>
        {summaryBattles && (
          <TimeRange
            data={summaryBattles[0] || [{ day: '2023-09-09', value: 0 }]}
            from={fromDate || '2023-09-09'}
            to={season?.endDate?.slice(0, 10) || '2023-09-10'}
            direction={'vertical'}
            align={'center'}
            width={280}
            height={240}
            emptyColor={'#DDDDDD'}
            minValue={1}
            maxValue={80}
            colors={colors}
            margin={{ left: 20 }}
            weekdayTicks={[]}
            weekdayLegendOffset={0}
            firstWeekday={'thursday'}
            dayBorderWidth={2}
            dayBorderColor={'#EEEEEE'}
            onClick={(datum) => {
              setDailyBrawlerDate(datum.date);
            }}
            tooltip={(n) => {
              const matchChange = summaryBattles[1].find(({ day }) => day === n.day).value;
              const x = n['coordinates'].x;

              return (
                <div className={defStyles.nivoLegend} style={{ transform: `translate(${x === 0 ? 80 : x < 40 ? 100 : x > 180 ? -60 : x > 200 ? -80 : 0}px, 0)` }}>
                  <span>
                    {n.value} battles(
                    {matchChange > 0 ? `+${matchChange}` : `${matchChange || 0}`})
                  </span>
                  <span>on {n.day}</span>
                </div>
              );
            }}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'row',
                justify: false,
                itemCount: 4,
                itemWidth: 40,
                itemHeight: 36,
                itemsSpacing: 8,
                itemDirection: 'left-to-right',
                translateX: -36,
                translateY: -10,
                symbolSize: 20
              }
            ]}
          />
        )}
      </div>
      <div className={styles.userDailyBrawlerStatBox}>
        <h3>{locales.user['battle']?.brawlerBattles || 'brawlerBattles'}</h3>
        <div className={styles.selectedDate}>
          ({dailyBrawlerDate.toLocaleDateString()} {locales.application['selected'] || 'selected'})
        </div>
        <UserBrawlerStatsBox brawlers={dailyBrawlerItem} type={'rate'} />
      </div>
    </div>
  );
};
