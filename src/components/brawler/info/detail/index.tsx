import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

const powerLevelElement = ['health', 'attack-damage'];

export const BrawlerInfoDetail = ({ infoDetail }) => {
  const { t } = useTranslation();

  let health: number,
    speed: number,
    superAttack,
    attack;

  if (infoDetail) {
    speed = infoDetail.speed;
    superAttack = infoDetail.super;
    attack = infoDetail.attack;
    health = infoDetail.health;

    return (
      <div className={styles.brawlerInfoDetailWrapper}>
        <div>
          <div>
            <div>
              <strong>
                {t('brawler.info.health')}
              </strong>:
              <span>
                {health * 2}
              </span>
            </div>
          </div>
          <div>
            <div>
              <strong>
                {t('brawler.info.speed')}
              </strong>:
              <span>
                {speed}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className={styles.attackName}>
              {t('brawler.info.attack')} : {attack.name}
            </div>
            {
              Object.entries(attack).map(([key, value]: [string, number]) => {
                if (key !== 'name') {
                  return (
                    <div key={key}>
                      <strong>
                        {t(`brawler.info.attack-${key}`)}
                      </strong>:
                      <span>
                        {powerLevelElement.includes(`attack-${key}`) ? value * 2 : value}
                      </span>
                    </div>
                  );
                }
                return null;
              })
            }
          </div>
          <div>
            <div className={styles.attackName}>
              {t('brawler.info.super')} : {superAttack.name}
            </div>
            {
              Object.entries(superAttack).map(([key, value]: [string, number]) => {
                if (key !== 'name') {
                  return (
                    <div key={key}>
                      <strong>
                        {t(`brawler.info.attack-${key}`)}
                      </strong>:
                      <span>
                      {powerLevelElement.includes(`attack-${key}`) ? value * 2 : value}
                    </span>
                    </div>
                  );
                }
                return null;
              })
            }
          </div>
        </div>
      </div>
    );
  }
  return null;
};