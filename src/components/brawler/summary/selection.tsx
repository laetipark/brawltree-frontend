import React, { useState } from 'react';

import config from '~/config/config';

import styles from './selection.module.scss';

const BrawlerSelection = ({ brawlers, setBrawler }) => {
  const [radio, setRadio] = useState('16000000');
  const handleRadioButton = (brawler) => {
    setRadio(brawler.brawlerID);
    setBrawler(brawler);
  };

  return (
    <nav className={styles.brawlerSelectionWrapper}>
      <div>
        {brawlers?.map((brawler) => {
          return (
            <React.Fragment key={brawler.brawlerID}>
              <input
                type="radio"
                className={styles.brawlerButton}
                id={brawler.brawlerID}
                name={brawler.brawlerID}
                value={brawler.brawlerID}
                checked={radio === brawler.brawlerID}
                onChange={() => {
                  handleRadioButton(brawler);
                }}
              />
              <label
                htmlFor={brawler.brawlerID}
                className={styles.brawlerImage}
              >
                <img
                  src={`${config.assets}/brawlers/profiles/${brawler.brawlerID}.webp`}
                  alt={brawler.brawlerID}
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
