import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import InputField from '~/components/main/input-field';
import ResultField from '~/components/main/result-field';

import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './main.module.scss';
import { debounce } from '~/utils/debounce';

export const Main = () => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<string>('');
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const setInput = debounce((value: string) => {
    if (value.length > 1) {
      setInputValue(value);
    }
  }, 500);

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.app}>
      <div className={styles.titleBox}>
        <div>
          <img src={'/images/logo/brawltree/logo192.png'} alt={'Logo'} />
          <div>Brawl Tree</div>
        </div>
      </div>
      <form
        className={styles.inputBox}
        onSubmit={(e) => {
          navigate(`/brawlian/${e.target[0].value.toUpperCase()}`);
        }}
      >
        <InputField onChangeInput={onChangeInput} />
        <ResultField
          inputValue={inputValue}
          setInputValue={setInputValue}
          setToggle={setToggle}
        />
      </form>
      <div className={styles.findTagToggle}>
        <h3 onClick={() => setToggle(!toggle)}>
          <FontAwesomeIcon
            icon={faAngleRight}
            style={{
              transform: toggle ? 'rotate(90deg)' : '',
              transition: 'transform 0.3s ease',
            }}
          />
          <span>{t(`main.findTag`)}</span>
        </h3>
        {toggle && (
          <img
            className={styles.howToFindTag}
            src={'/images/help/find_tag_kr.webp'}
            alt={'find_tag'}
          />
        )}
      </div>
    </div>
  );
};
