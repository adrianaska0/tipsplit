import React from 'react';
import {MDBFooter} from 'mdb-react-ui-kit';


const Footer = () => {
  return (
    <div className="fixed-bottom">
       <MDBFooter className='text-center text-white' style={{ backgroundColor: '#f1f1f1' }}>
      <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <br/>
        © 2020 Copyright:
      </div>
    </MDBFooter>
    </div>
  );
};

export default Footer;
