import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CdnContext } from '~/context/cdn.context';
import { isRRMatch } from '~/utils/korean-pattern';

import config from '~/common/config/config';

import styles from './index.module.scss';

export const BrawlerSelection = ({ brawlers, brawler, setBrawler }) => {
  const [radio, setRadio] = useState(brawler?.id || '16000000');
  const handleRadioButton = (brawler) => {
    setBrawler(brawler);
  };
  const [searchBrawlerName, SetSearchBrawlerName] = useState('');
  const [filterBrawlers, setFilterBrawlers] = useState([]);

  const locales = useContext(CdnContext);
  const navigate = useNavigate();

  useEffect(() => {
    setFilterBrawlers(
      brawlers.filter((brawler) => {
        return isRRMatch(
          searchBrawlerName,
          locales.brawler['brawler'][`${brawler.name}`],
        );
      }),
    );
  }, [searchBrawlerName]);

  useEffect(() => {
    setRadio(brawler.id);
  }, [brawler.id]);

  return (
    <div className={styles.brawlerSelectionWrapper}>
      <div>
        <span>브롤러 목록</span>
        <input
          type={'text'}
          className={styles.searchBrawlers}
          placeholder={'브롤러 검색 (쉘리, ㅅㄹ)'}
          maxLength={12}
          onChange={(event) => SetSearchBrawlerName(event.target.value)}
        />
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
                  navigate(
                    `../brawler/${brawler.name.toLowerCase().replaceAll(' ', '')}`,
                  );
                }}
              />
              <label htmlFor={brawler.id} className={styles.brawlerImage}>
                <img
                  src={`${config.assets}/brawlers/profiles/${brawler.id}.webp`}
                  alt={brawler.id}
                />
                <div>
                  <span>{locales.brawler['brawler'][`${brawler.name}`]}</span>
                </div>
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
