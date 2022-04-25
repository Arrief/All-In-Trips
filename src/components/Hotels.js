import React, { useContext } from 'react';

import { MyContext } from '../context/MyProvider';

const Hotels = () => {
  const context = useContext(MyContext);

  return(
    <>
      {context.apiLoaded === true &&
          context.hotelData.map((element, index) => {
            return (
              <div className="card" key={index}>
                <p><b>Hotel name:</b> <i>{element.hotel_name} </i>
                </p>
                <p><b>Hotel address:</b> <i>{element.address}</i>
                </p>
                <p>
                <b>Review:</b> <i>Score: {element.review_score}, Nr of reviews: {element.review_nr}</i></p>
                <p>
                <b>Link to book hotel:</b> <i>{element.url}</i></p>
                <p>
                <b>Best price:</b> <i>{element.price_breakdown.gross_price}, {element.price_breakdown.currency}</i></p>
              </div>
            )
          })
      }
    </>
  )
};

export default Hotels;