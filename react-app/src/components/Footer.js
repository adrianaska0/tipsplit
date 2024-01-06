import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <>
       <MDBFooter class="fixed-bottom" className='text-center text-white' style={{ backgroundColor: '#f1f1f1' }}>
      <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <br/>
        © 2020 Copyright:
      </div>
    </MDBFooter>
    </>
  );
};

export default Footer;
