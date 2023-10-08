import React, { useState } from 'react';

import config from '~/config/config';

import styles from './brawler_selection.module.scss';

const BrawlerSelection = ({ brawlers, setBrawler }) => {
  const [radio, setRadio] = useState('16000000');
  const handleRadioButton = (brawler) => {
    setRadio(brawler.BRAWLER_ID);
    setBrawler(brawler);
  };

  return (
    <nav className={styles.brawlerSelectionWrapper}>
      <div>
        {brawlers?.map((brawler) => {
          return (
            <React.Fragment key={brawler.BRAWLER_ID}>
              <input
                type="radio"
                className={styles.brawlerButton}
                id={brawler.BRAWLER_ID}
                name={brawler.BRAWLER_ID}
                value={brawler.BRAWLER_ID}
                checked={radio === brawler.BRAWLER_ID}
                onChange={() => {
                  handleRadioButton(brawler);
                }}
              />
              <label
                htmlFor={brawler.BRAWLER_ID}
                className={styles.brawlerImage}
              >
                <img
                  src={`${config.assets}/brawlers/profiles/${brawler.BRAWLER_ID}.webp`}
                  alt={brawler.BRAWLER_ID}
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
