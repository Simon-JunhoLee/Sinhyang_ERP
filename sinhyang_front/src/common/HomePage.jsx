import React from 'react'

const HomePage = () => {

  const erpClick = () => {
    window.location.href = '/erp';
  };

  const webClick = () => {
    window.location.href = '/web';
  };

  return (
    <div className='web-container mt-5'>
      
      
      <div className='web-image-wrapper'>
        <img
          src="/images/menupage/co2.png"
          alt="Company Page"
          className="clickable-image"
          onClick={webClick}
          style={{ cursor: 'pointer', width: '350px', height: '350px' }}/>



        <img
          src="/images/menupage/co1.jpg"
          alt="Employee Page"
          className="clickable-image ms-5"
          onClick={erpClick}
          style={{ cursor: 'pointer', width: '350px', height: '350px' }}/>
      </div>


      
    </div>
  );
};

export default HomePage;