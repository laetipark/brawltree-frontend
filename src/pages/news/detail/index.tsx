import React from 'react';
import { NewsItemBox } from '~/components/news/news-item';

import defStyles from '~/common/styles/app.module.scss';

export const NewsListItem = () => {
  return (
    <div className={defStyles.app}>
      <NewsItemBox />
    </div>
  );
};
