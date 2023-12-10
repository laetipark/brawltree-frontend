import React, { useState } from 'react';

import config from '~/config/config';

import styles from './selection.module.scss';

const BrawlerSelection = ({ brawlers, setBrawler }) => {
  const [radio, setRadio] = useState('16000000');
  const handleRadioButton = (brawler) => {
    setRadio(brawler.id);
    setBrawler(brawler);
  };

  return (
    <nav className={styles.brawlerSelectionWrapper}>
      <div>
        {brawlers?.map((brawler) => {
          return (
            <React.Fragment key={brawler.id}>
              <input
                type="radio"
                className={styles.brawlerButton}
                id={brawler.id}
                name={brawler.id}
                value={brawler.id}
                checked={radio === brawler.id}
                onChange={() => {
                  handleRadioButton(brawler);
                }}
              />
              <label htmlFor={brawler.id} className={styles.brawlerImage}>
                <img
                  src={`${config.assets}/brawlers/profiles/${brawler.id}.webp`}
                  alt={brawler.id}
                />
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default BrawlerSelection;
