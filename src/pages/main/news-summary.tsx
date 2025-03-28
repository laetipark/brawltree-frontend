import React, { useContext, useEffect, useState } from 'react';
import YouTube from 'react-youtube';

import { NewsItemsContent } from '~/components/news/news-items';
import { MainService } from '~/services/main.service';
import { CdnContext } from '~/context/cdn.context';

import styles from '~/assets/styles/pages/main/news-summary.module.scss';

export const NewsSummaryContainer = () => {
  const locales = useContext(CdnContext);

  const [brawlTalk, setBrawlTalk] = useState('');
  const [communityEvent, setCommunityEvent] = useState('');
  const opts = {
    height: '200',
    width: '100%'
  };

  useEffect(() => {
    MainService.getYoutubePlayListItem('PLTBLax1DE1612clulHb7Ci4JQEVMKoC7x').then((data) => {
      setBrawlTalk(data.items[0].snippet.resourceId.videoId);
    });

    MainService.getYoutubePlayListItem('PLTBLax1DE16277M59DSqvch_-eVxL8R1S').then((data) => {
      setCommunityEvent(data.items[0].snippet.resourceId.videoId);
    });
  }, []);

  return (
    <React.Fragment>
      <div className={styles.brawlNewsContainer}>
        <h2 className={styles.brawlNewsTitle}>{locales.main['news'] || 'news'}</h2>
        <div className={styles.brawlNewsBox}>
          <div>
            <YouTube videoId={brawlTalk} opts={opts} />
            <YouTube videoId={communityEvent} opts={opts} />
          </div>
          <NewsItemsContent />
        </div>
      </div>
    </React.Fragment>
  );
};
