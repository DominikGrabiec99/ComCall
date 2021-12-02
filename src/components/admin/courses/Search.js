/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import bemCssModules from 'bem-css-modules';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-named-default
import { default as CoursesStyles } from '../../../styles/admin/Courses.module.scss';

const block = bemCssModules(CoursesStyles);

const Search = ({
  searchValue,
  setSearchValue,
  arrayLevel,
  radioInputValue,
  setRadioInputValue
}) => (
  <div className={block('search-container')}>
    <div>
      <div className={block('search-box')}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Find course"
          className={block('search-input')}
        />
        <span className={`material-icons-outlined ${block('search-icon')}`}>search</span>
      </div>
    </div>
    <div>
      <div className={block('select-box')}>
        <div className={block('select-checked')}>
          <select id="level" name="level" className={block('select')}>
            {arrayLevel.map((level, index) => (
              // eslint-disable-next-line jsx-a11y/no-onchange
              <option
                key={index}
                className={block('select-item')}
                value={level}
                checked={radioInputValue === level}
                onChange={(e) => {
                  setRadioInputValue(e.target.value);
                }}
              >
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default Search;

Search.propTypes = {
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
  arrayLevel: PropTypes.array,
  radioInputValue: PropTypes.string,
  setRadioInputValue: PropTypes.func
};
