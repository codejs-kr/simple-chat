import React from 'react';
import utils from 'modules/utils';
import './ThemeChanger.scss';

const ThemeChanger = () => {
  const changeTheme = (theme) => {
    document.querySelector('#codejs').setAttribute('data-theme', theme);
    document.querySelector('.github-corner').setAttribute('data-theme', theme);
    utils.setStorage('theme', theme);
  };

  changeTheme(utils.getStorage('theme') || 'light');

  return (
    <div id="theme-changer">
      <button onClick={() => changeTheme('light')}>Light</button>
      <button onClick={() => changeTheme('dark')}>Dark</button>
    </div>
  );
};

export default ThemeChanger;
