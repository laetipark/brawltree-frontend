import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchContext } from '~/context/search.context';

export const InputField = ({ onChangeInput }) => {
  const { t } = useTranslation();
  const context = useContext(SearchContext);
  const { onAddSearchHistory } = context;

  const handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      onAddSearchHistory(e.target.value);
    }
  };

  return (
    <React.Fragment>
      <img src={'/images/etc/search.webp'} alt={'search'} />
      <input
        type={'text'}
        name={'search'}
        required={true}
        placeholder={t('main.input')}
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
