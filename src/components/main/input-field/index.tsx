import React, { useCallback, useContext } from 'react';
import { SearchContext } from '~/context/search.context';
import { CdnContext } from '~/context/cdn.context';

export const InputField = ({ onChangeInput }) => {
  const locales = useContext(CdnContext);
  const context = useContext(SearchContext);
  const { onAddSearchHistory } = context;

  const handleEnterKey = useCallback(
    ({ keyCode, target }) => {
      if (keyCode === 13) {
        onAddSearchHistory(target.value);
      }
    },
    [onAddSearchHistory],
  );

  return (
    <React.Fragment>
      <img src={'/images/etc/search.webp'} alt={'search'} />
      <input
        type={'text'}
        name={'search'}
        required={true}
        placeholder={locales.main['input']}
        maxLength={12}
        pattern="#?[O0289PYLQGRJCUVopylqgrjcuv]{3,12}"
        style={{ textTransform: 'uppercase' }}
        onChange={onChangeInput}
        onKeyDown={handleEnterKey}
      />
      <button type={'submit'}>TREE</button>
    </React.Fragment>
  );
};
