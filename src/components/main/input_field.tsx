import React from 'react';
import { useTranslation } from 'react-i18next';

const InputField = ({ onChangeInput }) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <img src={'/images/etc/search.webp'} alt={'search'} />
      <input
        type={'text'}
        name={'id'}
        required={true}
        placeholder={t(`main.input`)}
        maxLength={12}
        pattern="#?[O0289PYLQGRJCUVopylqgrjcuv]{3,12}"
        style={{ textTransform: 'uppercase' }}
        onChange={onChangeInput}
      />
      <button type={'submit'}>TREE</button>
    </React.Fragment>
  );
};

export default InputField;
