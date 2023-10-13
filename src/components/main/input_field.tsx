import React from 'react';

const InputField = ({ onChangeInput }) => {
  return (
    <React.Fragment>
      <img src={'/images/etc/search.webp'} alt={'search'} />
      <input
        type={'text'}
        name={'id'}
        required={true}
        placeholder={'닉네임 or 유저 태그'}
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
