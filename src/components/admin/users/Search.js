import React from 'react';
import PropTypes from 'prop-types';
import bemCssModules from 'bem-css-modules';

// eslint-disable-next-line import/no-named-default
import { default as CoursesStyles } from '../../../styles/admin/Users.module.scss';

const block = bemCssModules(CoursesStyles);

const Search = ({ searchValue, setSearchValue, setIsAddUserPanelVisible }) => (
  <section className={block('search-box')}>
    <div>
      <button
        type="button"
        onClick={() => setIsAddUserPanelVisible(true)}
        className={block('btn-add')}
      >
        Addd new user
        <span className="material-icons-outlined">add</span>
      </button>
    </div>
    <div className={block('input-container')}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Find user"
        className={block('input-search')}
      />
      <span className={`material-icons-outlined ${block('icon-search')}`}>search</span>
    </div>
  </section>
);

export default Search;

Search.propTypes = {
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
  setIsAddUserPanelVisible: PropTypes.func
};
