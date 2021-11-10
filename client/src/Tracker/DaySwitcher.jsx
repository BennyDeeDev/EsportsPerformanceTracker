import React from 'react';
import arrowLeft from '../images/back.svg';
import arrowRight from '../images/next.svg';

const DaySwitcher = ({ day, onClickLeft, onClickRight }) => {
   return (
      <div className="flex m-4 justify-center">
         <img
            onClick={onClickLeft}
            className="mx-1"
            src={arrowLeft}
            style={{ width: 25 }}
            alt=""
         />
         <h2>{day}</h2>
         <img
            onClick={onClickRight}
            className="mx-1"
            src={arrowRight}
            style={{ width: 25 }}
            alt=""
         />
      </div>
   );
};

export default DaySwitcher;
