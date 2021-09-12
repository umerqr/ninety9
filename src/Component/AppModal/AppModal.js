/* eslint-disable react/require-default-props */

import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import AppLabel from '../AppLabel';
import './styles.css';

const AppModal = ({
  parentClassName, modalOpen, handleClose, onEscapeKeyDown,
  children, className, label, childClassName, onRendered, mainHeadingClassName,
}) => (
  <Modal
    className={`${parentClassName} modal-root-class`}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={modalOpen}
    disableAutoFocus
    onClose={handleClose}
    onEscapeKeyDown={onEscapeKeyDown}
    onRendered={onRendered}
  >
    <div className={`${childClassName} paper-main-div`}>
      <div className="modal-top row align-items-center justify-content-between m-0">
        <AppLabel className={mainHeadingClassName || 'advanced-search-heading col'} label={label} />
        <div className="d-flex flex-row-reverse p-0">
          <Button className="button-modal" onClick={handleClose}>
            <ClearIcon />
          </Button>
        </div>
      </div>
      <div className={className}>{children}</div>
    </div>
  </Modal>
);

AppModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  parentClassName: PropTypes.string,
  onEscapeKeyDown: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
  label: PropTypes.string.isRequired,
  childClassName: PropTypes.string,
  mainHeadingClassName: PropTypes.string,
  onRendered: PropTypes.func,
};

export default AppModal;
