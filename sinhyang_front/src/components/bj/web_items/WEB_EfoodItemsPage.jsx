import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Card, Container } from 'react-bootstrap';

const WEB_EfoodItemsPage = () => {
    const [items, setItems] = useState([]);


    const CallAPI = async () => {
        const res = await axios.get('/erp/items/list.json');
      //  console.log(res.data);
      const modifiedItems = res.data.map(item => ({
        ...item,
        items_name: item.items_name.slice(0, -5)  // items_name을 뒤에서 5자리만 자름
    }));
    setItems(modifiedItems);
    }
    
    useEffect(() => {
        CallAPI();
    }, []);
  return (
    <div>
        <Container className='mt-5'>
            <Row>
                {items && items.filter((item) => item.items_type === 3).map((item, index) => (
                    <Col xs={12} md={6} lg={4} className='mb-4' key={item.items_id}>
                        <Card>
                            <Row>
                                <Col xs={4}>
                                    <Card.Img src={item.items_photo} />
                                </Col>
                                <Col xs={8} className="d-flex align-items-center">
                                    <div className="w-100">
                                        <Card.Body>
                                            <Card.Title>{item.items_name}</Card.Title>
                                            <hr />
                                       
                                        </Card.Body>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        
    </div>
  )
}

export default WEB_EfoodItemsPage