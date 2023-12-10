import React from 'react';

import config from '~/config/config';

import styles from './menu.module.scss';

const MenuTypeNGrade = ({
  type,
  grade,
  setType,
  setGrade,
  rotationTL,
  rotationPL,
}) => {
  const handleRadioButton = ({ target }) => {
    setType(target.name);
    if (target.name === '0') {
      setGrade(['0', '1', '2', '3', '4', '5', '6', '7']);
    } else {
      setGrade(['0', '1', '2', '3', '4', '5', '6']);
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
        <ul className={styles.mapTypeGroup}>
          <li>
            <input
              type={'radio'}
              id={'0'}
              name={'0'}
              checked={type === '0'}
              disabled={!rotationTL}
              onChange={handleRadioButton}
            />
            <label htmlFor={'0'}>
              <img
                className={styles.mapMenuItemImage}
                src={`${config.assets}/modes/icon/trophyLeague.webp`}
                alt={`trophyLeague`}
              />
            </label>
          </li>
          <li>
            <input
              type={'radio'}
              id={'2'}
              name={'2'}
              checked={type === '2'}
              disabled={!rotationPL}
              onChange={handleRadioButton}
            />
            <label htmlFor={'2'}>
              <img
                className={styles.mapMenuItemImage}
                src={`${config.assets}/modes/icon/powerLeagueSolo.webp`}
                alt={`trophyLeague`}
              />
            </label>
          </li>
          <li>
            <input
              type={'radio'}
              id={'3'}
              name={'3'}
              checked={type === '3'}
              disabled={!rotationPL}
              onChange={handleRadioButton}
            />
            <label htmlFor={'3'}>
              <img
                className={styles.mapMenuItemImage}
                src={`${config.assets}/modes/icon/powerLeagueTeam.webp`}
                alt={`trophyLeague`}
              />
            </label>
          </li>
        </ul>
      </div>
      <div>
        <ul className={styles.mapGradeGroup}>
          {type === '0'
            ? ['0', '1', '2', '3', '4', '5', '6', '7'].map((gradeNum) => {
                return (
                  <li key={`grade_${gradeNum}`}>
                    <input
                      type={'checkbox'}
                      id={`grade_${gradeNum}`}
                      name={`grade_${gradeNum}`}
                      checked={isChecked(gradeNum)}
                      onChange={({ target: { checked } }) =>
                        handleCheckBoxButton({ checked, value: gradeNum })
                      }
                    />
                    <label htmlFor={`grade_${gradeNum}`}>
                      <img
                        className={styles.mapMenuItemImage}
                        src={`${config.assets}/rank/trophy_league/grade/${gradeNum}.webp`}
                        alt={`grade_${gradeNum}`}
                      />
                    </label>
                  </li>
                );
              })
            : ['2', '3'].includes(type)
            ? ['0', '1', '2', '3', '4', '5', '6'].map((gradeNum) => {
                return (
                  <li key={`grade_${gradeNum}`}>
                    <input
                      type={'checkbox'}
                      id={`grade_${gradeNum}`}
                      name={`grade_${gradeNum}`}
                      checked={isChecked(gradeNum)}
                      onChange={({ target: { checked } }) =>
                        handleCheckBoxButton({ checked, value: gradeNum })
                      }
                    />
                    <label htmlFor={`grade_${gradeNum}`}>
                      <img
                        className={styles.mapMenuItemImage}
                        src={`${config.assets}/rank/power_league/${gradeNum}.webp`}
                        alt={`grade_${gradeNum}`}
                      />
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
