import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useWindowClick from '~/hooks/use-window-click';

import config from '~/config/config';

import styles from './menu-type.module.scss';

const typeNumber = {
  7: 'all',
  0: 'trophyLeague',
  2: 'powerLeagueSolo',
  3: 'powerLeagueTeam',
};

const MenuType = ({ type, setMatchType }) => {
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
        <img
          src={`${config.assets}/modes/icon/${typeNumber[type]}.webp`}
          alt={'type_7'}
        />
        <div>{t(`battle.type.${typeNumber[type]}`)}</div>
      </button>
      <div
        className={styles.typeMenuList}
        style={{ display: checked ? 'flex' : 'none' }}
      >
        <input
          className={styles.typeButton}
          type={'radio'}
          id={'type_7'}
          name={'type_7'}
          value={'7'}
          checked={type === '7'}
          onChange={(e) => {
            setMatchType(e);
            setChecked(!checked);
          }}
        />
        <label htmlFor={'type_7'}>
          <img src={`${config.assets}/modes/icon/all.webp`} alt={'type_7'} />
          <div>{t('battle.type.all')}</div>
        </label>
        <input
          className={styles.typeButton}
          type={'radio'}
          id={'type_0'}
          name={'type_0'}
          value={'0'}
          checked={type === '0'}
          onChange={(e) => {
            setMatchType(e);
            setChecked(!checked);
          }}
        />
        <label htmlFor={'type_0'}>
          <img
            src={`${config.assets}/modes/icon/trophyLeague.webp`}
            alt={'type_0'}
          />
          <div>{t('battle.type.trophyLeague')}</div>
        </label>
        <input
          className={styles.typeButton}
          type={'radio'}
          id={'type_2'}
          name={'type_2'}
          value={'2'}
          checked={type === '2'}
          onChange={(e) => {
            setMatchType(e);
            setChecked(!checked);
          }}
        />
        <label htmlFor={'type_2'}>
          <img
            src={`${config.assets}/modes/icon/powerLeagueSolo.webp`}
            alt={'type_2'}
          />
          <div>{t('battle.type.powerLeagueSolo')}</div>
        </label>
        <input
          className={styles.typeButton}
          type={'radio'}
          id={'type_3'}
          name={'type_3'}
          value={'3'}
          checked={type === '3'}
          onChange={(e) => {
            setMatchType(e);
            setChecked(!checked);
          }}
        />
        <label htmlFor={'type_3'}>
          <img
            src={`${config.assets}/modes/icon/powerLeagueTeam.webp`}
            alt={'type_3'}
          />
          <div>{t('battle.type.powerLeagueTeam')}</div>
        </label>
      </div>
    </div>
  );
};

export default MenuType;
