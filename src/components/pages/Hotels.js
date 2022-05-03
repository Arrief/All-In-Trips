import React, { useContext } from 'react';
import Dropdown from '../Dropdown';
import { MyContext } from '../../context/MyProvider';
// import '../App.css'

const Hotels = () => {
  const context = useContext(MyContext);

  // ! hotel video should not be in map, repeated for every element! Also need key!
  const mapHotelsOutput = (element, index) => {
    return (
            <div className='hotel-container'>
            {/* <video src='/videos/video-hotel.mp4' autoPlay loop muted /> */}
            <div className='hotel-text'>
              <br />
              <h1>Hotels</h1>
            <div className="card" key={index}>
              <p><b>Hotel name:</b> <i>{element.hotel_name} </i>
              </p>
              <img src={element.max_photo_url} alt={element.hotel_name} />
              <p><b>Hotel address:</b> <i>{element.address}, {element.zip} {element.city}</i>
              </p>
              <p><b>Distance to the city center of {element.city}:</b> {element.distance_to_cc} miles</p>
              <p><b>Check-In from:</b> {element.checkin.from} h</p>
              <p><b>Check-Out until:</b> {element.checkout.until} h</p>
              <p>
              <b>Review score:</b> &#11088; <i>{element.review_score} / 10, <b>Nr of reviews:</b> {element.review_nr}</i></p>
              <p>
              <b>Link to book hotel:</b> <a href={element.url} target="_blank">Check more details at Booking.com</a></p>
              <p>
              <b>Total price for your entire stay:</b> <i>{element.price_breakdown.gross_price} {element.price_breakdown.currency}</i></p>
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
      <hr />
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
    </>
  )
};

export default Hotels;
