import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const WEB_NewsDomesticPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

const callAPI = async()=> {
const res = await axios.get('https://newsapi.org/v2/top-headlines', {
  params: {
    country: 'kr',
    category: 'science',
    apiKey: '1a29f2ac9c1a41aeb70467b6a64ea855', 
  },
});


setNews(res.data.articles);
//console.log(res.data.articles);
// 카테고리 technology  business entertainment health science sports

setLoading(false);
} 
useEffect(()=>{
  callAPI();
}, []);




  if (loading) {
    return <h1 className='text-center my-5'><Spinner animation="border" variant="primary" /></h1>;
  }

  return (
    <Container>
      <h2 className='my-5 text-center'>신향  국내뉴스</h2>
      <Row>
        {news.map((article) => (
          <Col md={6} lg={4} className='mb-4'>
            <Card className="news-card">
              <a href={article.url} target="_blank" className="news-link">


                <Card.Img 
                  variant="top" 
                  src={article.urlToImage || "/images/menupage/shlogi3.png"} 
                  alt={article.title} 
                  className="news-image"/>


                <Card.Body className="news-card-body">
                  <Card.Title className="news-card-title">{article.title}</Card.Title>
                  <Card.Text className="news-card-text">{article.description}</Card.Text>
                </Card.Body>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WEB_NewsDomesticPage;
