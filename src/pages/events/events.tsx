import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { EventMenu } from '~/components/events/event-menu';
import { PageSeo } from '~/components/seo/page-seo';
import { CdnContext } from '~/context/cdn.context';

import styles from './events.module.scss';

export const Events = () => {
  const { mode } = useParams();
  const locales = useContext(CdnContext);
  const modeLabel = mode === 'ranked' ? 'Ranked' : mode === 'next' ? 'Upcoming' : 'Current';

  return (
    <React.Fragment>
      <PageSeo
        page="events"
        language={locales.language}
        title={`${modeLabel} Event Rotation`}
        description={`Browse ${modeLabel.toLowerCase()} Brawl Stars event rotation and map pool.`}
      />
      <div className={styles.app}>
        <EventMenu />
      </div>
    </React.Fragment>
  );
};
