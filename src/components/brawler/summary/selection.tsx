import React, { useEffect, useState } from 'react';

import config from '~/config/config';

import styles from './selection.module.scss';
import { useTranslation } from 'react-i18next';
import { isRRMatch } from '~/utils/korean-pattern';
import { useLocation, useNavigate } from 'react-router-dom';

export const BrawlerSelection = ({ brawlers, brawler, setBrawler }) => {
  const [radio, setRadio] = useState(brawler?.id || '16000000');
  const handleRadioButton = (brawler) => {
    setBrawler(brawler);
  };
  const [searchBrawlerName, SetSearchBrawlerName] = useState('');
  const [filterBrawlers, setFilterBrawlers] = useState([]);
  const [baseURL, setBaseURL] = useState(`../brawler/`);

  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setFilterBrawlers(brawlers.filter(brawler => {
      return isRRMatch(searchBrawlerName, t(`brawler.brawler.${brawler.name}`));
    }));
  }, [searchBrawlerName]);

  useEffect(() => {
    if (!/\/blossom.*/g.test(location.pathname)) {
      setBaseURL('../brawler/');
    } else {
      setBaseURL('../blossom/brawlers/');
    }
  }, [location]);

  useEffect(() => {
    setRadio(brawler.id);
  }, [brawler.id]);

  return (
    <div className={styles.brawlerSelectionWrapper}>
      <div>
        <span>브롤러 목록</span>
        <input
          type={'text'} className={styles.searchBrawlers}
          placeholder={'브롤러 검색 (쉘리, ㅅㄹ)'}
          maxLength={12}
          onChange={event => SetSearchBrawlerName(event.target.value)} />
      </div>
      <div>
        {filterBrawlers?.map((brawler) => {
          return (
            <React.Fragment key={brawler.id}>
              <input
                className={styles.brawlerButton}
                type="radio"
                id={brawler.id}
                name={'brawler'}
                checked={radio === brawler.id}
                onChange={() => {
                  handleRadioButton(brawler);
                  navigate(!/\/blossom.*/g.test(location.pathname) ?
                    `${baseURL}${brawler.name.toLowerCase().replaceAll(' ', '')}` : baseURL);
                }}
              />
              <label htmlFor={brawler.id} className={styles.brawlerImage}>
                <img
                  src={`${config.assets}/brawlers/profiles/${brawler.id}.webp`}
                  alt={brawler.id}
                />
                <div><span>{t(`brawler.brawler.${brawler.name}`)}</span></div>
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
