import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './OutsideClicker.scss';

const useOutsideClick = (ref, onClick) => {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      onClick && onClick();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};

/**
 * Component that alerts if you click outside of it
 */
const OutsideClicker = ({ children, onClick }) => {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, onClick);

  return (
    <div className="outside-clicker" ref={wrapperRef}>
      {children}
    </div>
  );
};

OutsideClicker.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};

OutsideClicker.defaultProps = {
  onClick: () => {
    alert('Need click event');
  },
};

export default OutsideClicker;
