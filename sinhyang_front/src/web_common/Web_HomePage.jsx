import React, { useState } from 'react';
import Slider from "react-slick";
import { Button, Col, Row } from 'react-bootstrap';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Popup from '../components/starim/web_popup/Popup';



const Web_HomePage = () => {
  const [images, setImages] = useState([
   '/images/menupage/nsm1.png', 
   '/images/menupage/ns1.jpg', 
   '/images/menupage/slider2.png',

  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover : false
  };

  return (
    <>
      <Popup/>
      <Row style={{ height: "45rem" }} className='web-hompage-slick'>
        <Col xs={6} md={8} lg={12}>

          <div className="web-background-image-container ">
            <Slider {...settings}>
              {images && images.map(img => (
                <div key={img} className="slider-image-container ">
                  <img src={img} className="slider-image web-responsive-image" />
                </div>
              ))}
            </Slider>
          </div>
        </Col>
      </Row>





      
    </>
  )
}

export default Web_HomePage;
