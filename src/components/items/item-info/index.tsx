import React, { useContext, useEffect, useState } from 'react';
import { CdnContext } from '~/context/cdn.context';

import config from '~/config/config';

import styles from './index.module.scss';

export const ItemTooltip = ({
  itemID,
  itemName,
  itemKind,
  values,
  brawlerPower,
  brawlerValues,
}) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [tooltipY, setTooltipY] = useState<number>();

  const locales = useContext(CdnContext);

  const handleMouseOver = ({ clientY }) => {
    const y = clientY + window.scrollY + 30;
    setTooltipY(y);
    setMouseOver(true);
  };

  const handleMouseOut = () => {
    setMouseOver(false);
  };

  useEffect(() => {
    const handleMouseMove = ({ clientY }) => {
      if (mouseOver) {
        const y = clientY + window.scrollY + 30;
        setTooltipY(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseOver]);

  let description = locales.brawler['brawlerItem'].description[`${itemID}`];
  const patternWithBracket = /\{(\d+)}/g;
  const pattern = /(\d+)/g;
  const matches = description
    ?.match(patternWithBracket)
    ?.map((item) => item.match(pattern))
    .map(Number);

  matches?.map((number) => {
    let value = undefined;
    if (values) {
      if (typeof values[number] === 'string') {
        const [first, second] = values[number].split('*');
        if (first.includes('.')) {
          const [firstChild, secondChild] = first.split('.');
          value =
            brawlerValues &&
            `${second * 100}%(${(brawlerValues[firstChild][secondChild] + brawlerValues[firstChild][secondChild] * (brawlerPower - 1) * 0.1) * second})`;
        } else {
          value =
            brawlerValues &&
            `${second * 100}%(${(brawlerValues[first] + brawlerValues[first] * (brawlerPower - 1) * 0.1) * second})`;
        }
      } else {
        value = values[number];
      }
    }
    description = description.replace(`{${number}}`, `${value && value}`);
  });

  return (
    <React.Fragment>
      <div onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
        <img
          className={styles.brawlerItem}
          src={`${config.assets}/brawlers/${itemKind}s/${itemID}.webp`}
          alt={itemID}
        />
      </div>
      {mouseOver && (
        <div className={styles.brawlerItemToolTip} style={{ top: tooltipY }}>
          <div className={styles.itemName}>
            <img
              className={styles.brawlerItem}
              src={`${config.assets}/brawlers/${itemKind}s/${itemID}.webp`}
              alt={itemID}
            />
            <span>{itemName}</span>
          </div>
          {<div>{description}</div>}
        </div>
      )}
    </React.Fragment>
  );
};
