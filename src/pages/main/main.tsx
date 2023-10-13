import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputField from '~/components/main/input_field';
import ResultField from '~/components/main/result_field';

import debounce from '~/utils/debounce';

import styles from './main.module.scss';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Main = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const onChangeInput = useCallback(
    ({ target }) => {
      const { value } = target;
      debounce(setInputValue(value), 500);
    },
    [inputValue],
  );

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
          <span>유저 태그 찾는 법</span>
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

export default Main;
