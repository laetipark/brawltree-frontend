import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

import styles from './main.module.scss';

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <div className={styles.titleBox}>
        <div>
          <img src={'/images/logo/logo192.png'}
               alt={'Logo'} />
          <div>Brawl Tree</div>
        </div>
      </div>
      <form className={styles.inputBox}
            onSubmit={e => {
              navigate(`./brawlian/${e.target[0].value.toUpperCase()}`);
            }}>
        <FontAwesomeIcon icon={faHashtag} />
        <input
          type={'text'}
          name={'id'}
          required={true}
          placeholder={'유저 태그'}
          maxLength={12}
          pattern='#?[O0289PYLQGRJCUVopylqgrjcuv]{3,12}'
          style={{ textTransform: 'uppercase' }}
        />
        <button type={'submit'}>
          TREE
        </button>
      </form>
    </div>
  );
};

export default Main;