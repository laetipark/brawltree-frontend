import React, { useContext } from 'react';
import { NewsItemsContent } from '~/components/news/news-items';

import { CdnContext } from '~/context/cdn.context';

import defStyles from '~/common/styles/app.module.scss';
import styles from '~/assets/styles/pages/news.module.scss';

export const NewsWrapper = () => {
  const locales = useContext(CdnContext);

  return (
    <div className={`${defStyles.app} ${styles.newsListWrapper}`}>
      <h2>{locales.main['news'] || 'news'}</h2>
      <h3>{locales.news['newsDesc'] || 'newsDesc'}</h3>
      <NewsItemsContent />
    </div>
  );
};
