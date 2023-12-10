import React, { useEffect, useState } from 'react';

import config from '~/config/config';

import styles from './item-info.module.scss';

const ItemTooltip = ({ itemID, itemName, itemKind }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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
          <div>아이템 설명</div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ItemTooltip;