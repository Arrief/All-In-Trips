import React, { useContext } from 'react';
import Dropdown from '../Dropdown';
import { MyContext } from '../../context/MyProvider';
import '../../App.css'

const Hotels = () => {
  const context = useContext(MyContext);

  // ! hotel video should not be in map, repeated for every element! Also need key!
  const mapHotelsOutput = (element, index) => {
    return (
            <div className='hotel-container'>
            {/* <video src='/videos/video-hotel.mp4' autoPlay loop muted /> */}
            <div className='hotel-text'>
              <br />
            <div className="card-hotel" key={index}>
              <p> <b className='text-size'>{element.hotel_name} </b>
              </p>
              <p> <i>{element.address}, {element.zip} {element.city}</i>
              </p>
              <br />
              <img src={element.max_photo_url} alt={element.hotel_name} />
              <br />
              <br/>
              <p><b>Distance from {element.city}:</b> {element.distance_to_cc} miles</p>
              <p><b>Check-In:</b> {element.checkin.from} h</p>
              <p><b>Check-Out:</b> {element.checkout.until} h</p>
              <p>
              <b>Review Score:</b> &#11088; <i>{element.review_score} / 10 ({element.review_nr} reviews)</i></p>
              <p>
              <a href={element.url} target="_blank">Check more details here</a></p>
              <p>
              <b>Total Price:</b> <i>{element.price_breakdown.gross_price} {element.price_breakdown.currency}</i></p>
            </div>
            </div>
            </div>
      )
  }

  return(
    <>
      <Dropdown 
      action={(event) => context.setOptionHotels(event.currentTarget.value)} 
      op1="best price"
      op2="best ratings"
      op3="most ratings"
      op4="closest to city center" 
      />
      <div className='hotel-text'>
          
      {context.optionHotels === "best price" &&
        context.hotelData.sort((a, b) => a.price_breakdown.gross_price - b.price_breakdown.gross_price)
        .map(mapHotelsOutput)
      }
      {context.optionHotels === "best ratings" &&
        context.hotelData.sort((a, b) => b.review_score - a.review_score)
        .map(mapHotelsOutput)
      }
      {context.optionHotels === "most ratings" &&
        context.hotelData.sort((a, b) => b.review_nr - a.review_nr)
        .map(mapHotelsOutput)
      }
      {context.optionHotels === "closest to city center" &&
        context.hotelData.sort((a, b) => a.distance_to_cc - b.distance_to_cc)
        .map(mapHotelsOutput)
      }
      </div>
      <br/>
    </>
  )
};

export default Hotels;
