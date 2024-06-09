import React from 'react';
import config from '~/config/config';
import styles from './menu.module.scss';
import { useTranslation } from 'react-i18next';

const tlGrade = ['~39', '40~139', '140~299', '300~499', '500~749', '750~999', '1000~1249', '1250~'];
const plGrade = ['bronze', 'silver', 'gold', 'diamond', 'mythic', 'legendary', 'masters'];

const MenuTypeNGrade = ({
                          type,
                          grade,
                          setType,
                          setGrade,
                          rotationTL,
                          rotationPL,
                        }) => {
  const { t } = useTranslation();

  const handleRadioButton = ({ target }) => {
    setType(target.id);
    if (target.id === '0') {
      setGrade(['4', '5', '6', '7']);
    } else {
      setGrade(['4', '5', '6']);
    }
  };

  const handleCheckBoxButton = ({ checked, value }) => {
    if (checked) {
      setGrade(grade.concat(value));
    } else {
      setGrade(grade.filter((v) => v !== value));
    }
  };

  const isChecked = (value) => grade.includes(value);

  return (
    <div className={styles.mapMenu}>
      <div>
        <div className={styles.mapTitle}>
          <span>분류</span>
        </div>
        <ul className={styles.mapTypeGroup}>
          <li>
            <input
              type={'radio'}
              id={'0'}
              name={'matchType'}
              checked={type === '0'}
              disabled={!rotationTL}
              onChange={handleRadioButton}
            />
            <label htmlFor={'0'}>
              <img
                className={styles.mapMenuItemImage}
                src={`${config.assets}/modes/icon/trophy.webp`}
                alt={`trophyLeague`}
              />
              <div>{t('battle.type.trophy')}</div>
            </label>
          </li>
          <li>
            <input
              type={'radio'}
              id={'2'}
              name={'matchType'}
              checked={type === '2'}
              disabled={!rotationPL}
              onChange={handleRadioButton}
            />
            <label htmlFor={'2'}>
              <img
                className={styles.mapMenuItemImage}
                src={`${config.assets}/modes/icon/ranked.webp`}
                alt={`trophyLeague`}
              />
              <div>{t('battle.type.ranked')}</div>
            </label>
          </li>
          <li>
            <input
              type={'radio'}
              id={'3'}
              name={'matchType'}
              checked={type === '3'}
              disabled={!rotationPL}
              onChange={handleRadioButton}
            />
          </li>
        </ul>
      </div>
      <div>
        <div className={styles.mapTitle}>
          <span>등급</span>
        </div>
        <ul className={styles.mapGradeGroup}>
          {type === '0'
            ? ['0', '1', '2', '3', '4', '5', '6', '7'].map((gradeNum, index) => {
              return (
                <li key={`grade_${gradeNum}`}>
                  <input
                    type={'checkbox'}
                    id={`grade_${gradeNum}`}
                    name={`matchTLGrade`}
                    checked={isChecked(gradeNum)}
                    onChange={({ target: { checked } }) =>
                      handleCheckBoxButton({ checked, value: gradeNum })
                    }
                  />
                  <label htmlFor={`grade_${gradeNum}`}>
                    <img
                      className={styles.mapMenuItemImage}
                      src={`${config.assets}/rank/trophy/grade/${gradeNum}.webp`}
                      alt={`grade_${gradeNum}`}
                    />
                    <span>{tlGrade[index]}</span>
                  </label>
                </li>
              );
            })
            : ['2', '3'].includes(type)
              ? ['0', '1', '2', '3', '4', '5', '6'].map((gradeNum, index) => {
                return (
                  <li key={`grade_${gradeNum}`}>
                    <input
                      type={'checkbox'}
                      id={`grade_${gradeNum}`}
                      name={`matchPLGrade`}
                      checked={isChecked(gradeNum)}
                      onChange={({ target: { checked } }) =>
                        handleCheckBoxButton({ checked, value: gradeNum })
                      }
                    />
                    <label htmlFor={`grade_${gradeNum}`}>
                      <img
                        className={styles.mapMenuItemImage}
                        src={`${config.assets}/rank/ranked/${gradeNum}.webp`}
                        alt={`grade_${gradeNum}`}
                      />
                      <span>{plGrade[index]}</span>
                    </label>
                  </li>
                );
              })
              : null}
        </ul>
      </div>
    </div>
  );
};
export default MenuTypeNGrade;
