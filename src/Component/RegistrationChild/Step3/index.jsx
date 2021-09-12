import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import addIcon from '../../../assets/img/add.svg';
import user from '../../../assets/img/perfil.svg';

const Step3Component = (props) => {
  const [prevData, setprevData] = React.useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const prevData = JSON.parse(localStorage.getItem('contactData'));
    // eslint-disable-next-line react/prop-types
    const prevList = [props.infoData];
    if (prevData && prevData.length) {
      prevData.map((key) => prevList.push(key));
    }
    setprevData(prevList);
    let data = [];
    const number = props.infoData.numValue;
    // eslint-disable-next-line no-param-reassign
    delete props.infoData.numValue;
    if (prevData) {
      data = [prevData, { ...props.infoData, number }];
    } else {
      data = [props.infoData];
    }

    if (data && data.length) {
      localStorage.setItem('contactData', JSON.stringify(data));
    }
    // eslint-disable-next-line
  }, []);
  // eslint-disable-next-line
  const { setcurrentStep, setinfoData } = props;
  return (
    <>
      <Form className="resgistration-form">
        <div className="form-header">
          <h2 className="form-title">
            <span>Beneficiarios agregados</span>
          </h2>
          {/* <p className='form-subtitle'>
            This is Sub Registration form and if you want to add more Click to
            the Add more
          </p> */}
        </div>
        {prevData && prevData.length
          ? prevData.map((list) => (
            <div className="user-list ">
              {' '}
              <img src={user} alt="user" />
              {list.name}
            </div>
          ))
          : null}
        <div className="mt-4 cursor-pointer user-list ">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <span
            onClick={() => {
              setcurrentStep(0);
              setinfoData({
                numValue: '985476238',
                name: 'Joe Doe',
                email: '',
                contact: '',
                country: 'Costa Rica',
              });
            }}
          >
            <img src={addIcon} alt="add" />
            Agregar beneficiario adicional
          </span>
        </div>
      </Form>
    </>
  );
};

Step3Component.propTypes = {
  infoData: PropTypes.shape({
    numValue: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contact: PropTypes.number.isRequired,
  }).isRequired,
};

export default Step3Component;
