import React, { useEffect, useState } from 'react';

import config from '~/config/config';

import styles from './item-info.module.scss';
import { useTranslation } from 'react-i18next';

interface ItemTooltipProps {
  brawlerPower: null;
}

interface ItemTooltipProps {
  brawlerValues: null;
}

const ItemTooltip = ({ itemID, itemName, itemKind, values, brawlerPower, brawlerValues }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const { t } = useTranslation();

  const handleMouseOver = ({ clientY, target }) => {
    const rect =
      target.parentElement.parentElement.parentElement.getBoundingClientRect();

    const x = parseInt(rect.left);
    const y = clientY + window.scrollY;

    setTooltipPosition({ x, y });
    setMouseOver(true);
  };

  const handleMouseOut = () => {
    setMouseOver(false);
  };

  useEffect(() => {
    const handleMouseMove = ({ clientY, target }) => {
      if (mouseOver) {
        const rect =
          target.parentElement.parentElement.parentElement.getBoundingClientRect();

        const x = parseInt(rect.left);
        const y = clientY + window.scrollY;

        setTooltipPosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseOver]);

  let description = t(`brawler.brawlerItem.description.${itemID}`);
  const patternWithBracket = /\{(\d+)}/g;
  const pattern = /(\d+)/g;
  const matches = (description.match(patternWithBracket))?.map(item => item.match(pattern)).map(Number);

  matches?.map(number => {
    let value = undefined;
    if (values) {
      if (typeof values[number] === 'string') {
        const [first, second] = values[number].split('*');
        if (first.includes('.')) {
          const [firstChild, secondChild] = first.split('.');
          value = brawlerValues && `${second * 100}%(${(brawlerValues[firstChild][secondChild] + (brawlerValues[firstChild][secondChild] * (brawlerPower - 1) * 0.1)) * second})`;
        } else {
          value = brawlerValues && `${second * 100}%(${(brawlerValues[first] + (brawlerValues[first] * (brawlerPower - 1) * 0.1)) * second})`;
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
        <div
          className={styles.brawlerItemToolTip}
          style={{ left: tooltipPosition.x - 100, top: tooltipPosition.y + 30 }}
        >
          <div className={styles.itemName}>
            <img
              className={styles.brawlerItem}
              src={`${config.assets}/brawlers/${itemKind}s/${itemID}.webp`}
              alt={itemID}
            />
            <span>{itemName}</span>
          </div>
          {
            <div>{description}</div>
          }
        </div>
      )}
    </React.Fragment>
  );
};

export default ItemTooltip;