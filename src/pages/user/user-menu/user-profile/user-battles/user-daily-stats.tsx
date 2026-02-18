import React, { useContext, useEffect, useState } from 'react';
import { ResponsiveTimeRange } from '@nivo/calendar';
import { useMediaQuery } from 'react-responsive';

import { UserBrawlerStatsBox } from '~/pages/user/user-menu/user-profile/user-battles/user-brawler-stats';
import { CdnContext } from '~/context/cdn.context';
import { UserDailyBrawlersType } from '~/common/types/users.type';

import defStyles from '~/common/styles/app.module.scss';
import styles from '~/assets/styles/pages/user/user-menu/user-profile/user-battles/user-daily-battles.module.scss';

export const UserDailyStatsBox = ({ summaryBattles, dailyBrawlers, season }) => {
  const locales = useContext(CdnContext);
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  const [dailyBrawlerItem, setDailyBrawlerItem] = useState<UserDailyBrawlersType[]>([]);
  const [dailyBrawlerDate, setDailyBrawlerDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

  const colors = ['#9DC08B', '#609966', '#557153', '#40513B'];
  const calendarTheme = {
    text: {
      fontFamily:
        '"Main Medium", "JP Medium", "CN Medium", "N Medium", -apple-system, BlinkMacSystemFont, "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      fill: '#1f2e22',
      fontSize: isDesktop ? 12 : 11
    },
    legends: {
      text: {
        fill: '#1f2e22',
        fontSize: isDesktop ? 12 : 11
      }
    }
  };
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
          <div className={styles.nivoCalendarFrame}>
            <ResponsiveTimeRange
              data={summaryBattles[0] || [{ day: '2023-09-09', value: 0 }]}
              from={fromDate || '2023-09-09'}
              to={season?.endDate?.slice(0, 10) || '2023-09-10'}
              direction={'vertical'}
              align={'center'}
              emptyColor={'#DDDDDD'}
              minValue={1}
              maxValue={80}
              colors={colors}
              margin={isDesktop ? { top: 10, right: 10, bottom: 42, left: 24 } : { top: 10, right: 10, bottom: 40, left: 22 }}
              weekdayTicks={[]}
              weekdayLegendOffset={0}
              firstWeekday={'monday'}
              dayBorderWidth={1}
              dayBorderColor={'#EEEEEE'}
              daySpacing={isDesktop ? 2 : 2}
              dayRadius={2}
              monthLegendOffset={isDesktop ? 8 : 8}
              theme={calendarTheme}
              onClick={(datum) => {
                setDailyBrawlerDate(datum.date);
              }}
              tooltip={(n) => {
                const matchChange = summaryBattles[1].find(({ day }) => day === n.day)?.value || 0;

                return (
                  <div className={defStyles.nivoLegend}>
                    <span>
                      {n.day}
                    </span>
                    <span>
                      {n.value} battles (
                      {matchChange > 0 ? `+${matchChange}` : `${matchChange}`})
                    </span>
                  </div>
                );
              }}
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  itemCount: 4,
                  itemWidth: isDesktop ? 32 : 30,
                  itemHeight: isDesktop ? 24 : 22,
                  itemsSpacing: isDesktop ? 10 : 8,
                  itemDirection: 'left-to-right',
                  translateX: 0,
                  translateY: -6,
                  symbolSize: isDesktop ? 14 : 12
                }
              ]}
            />
          </div>
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
