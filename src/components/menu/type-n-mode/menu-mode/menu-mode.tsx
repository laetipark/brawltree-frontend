import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowClick } from '~/hooks/use-window-click.hook';

import config from '~/config/config';

import styles from './menu-mode.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

export const ModeMenu = ({ mode, setMatchMode, type, rotationTL, rotationPL }) => {
  const { t } = useTranslation();

  const dropDownRef = useRef();
  const [checked, setChecked] = useWindowClick(dropDownRef, false);

  return (
    <div className={styles.typeMenuWrapper} ref={dropDownRef}>
      <button
        className={styles.typeMenuButton}
        onClick={() => {
          setChecked(!checked);
        }}
      >
        <img src={`${config.assets}/modes/icon/${mode}.webp`} alt={mode} />
        <div>{t(`battle.mode.${mode}`)}</div>
        <FontAwesomeIcon style={{
          transform: checked ? 'rotate(180deg)' : '',
          transition: 'transform 0.3s ease',
        }} fontSize={14} icon={faCaretUp} />
      </button>
      <div
        className={styles.typeMenuList}
        style={{ display: checked ? 'flex' : 'none' }}
      >
        {type === '0' || type === '7'
          ? rotationTL?.map((modeName: string) => (
            <React.Fragment key={`${modeName}`}>
              <input
                className={styles.typeButton}
                type={'radio'}
                id={modeName}
                name={modeName}
                value={modeName}
                checked={modeName === mode}
                onChange={(e) => {
                  setMatchMode(e);
                  setChecked(!checked);
                }}
              />
              <label htmlFor={modeName}>
                <img
                  src={`${config.assets}/modes/icon/${modeName}.webp`}
                  alt={modeName}
                />
                <div>{t(`battle.mode.${modeName}`)}</div>
              </label>
            </React.Fragment>
          ))
          : rotationPL?.map((modeName: string) => (
            <React.Fragment key={`${modeName}`}>
              <input
                className={styles.typeButton}
                type={'radio'}
                id={modeName}
                name={modeName}
                value={modeName}
                checked={modeName === mode}
                onChange={(e) => {
                  setMatchMode(e);
                  setChecked(!checked);
                }}
              />
              <label htmlFor={modeName}>
                <img
                  src={`${config.assets}/modes/icon/${modeName}.webp`}
                  alt={modeName}
                />
                <div>{t(`battle.mode.${modeName}`)}</div>
              </label>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};
