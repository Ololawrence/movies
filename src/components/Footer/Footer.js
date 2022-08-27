import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
      <div className="footer">
        <div>movie app</div>
        {/* <div>{Date()}, movie, inc or its affiliates</div> */}
        <div>{new Date().getFullYear()} movie, inc or its affiliate</div>
      </div>
    );
};

export default Footer;