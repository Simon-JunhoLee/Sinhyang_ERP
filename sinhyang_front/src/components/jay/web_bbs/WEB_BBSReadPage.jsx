import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, InputGroup, Row } from 'react-bootstrap';
import { Form, Navigate, useNavigate, useParams } from 'react-router-dom';

const WEB_BBSReadPage = () => {
  const {bbs_id} = useParams();
  const [form, setForm] = useState([]);
  const [loginId, setLoginId] = useState();
 

  const callAPI = async () => {
    const res= await axios.get(`/bbs/read/${bbs_id}`);
   // console.log(res.data);
    setForm(res.data);
  }


  useEffect(() => {
    callAPI();
  },[]);

  const onClickDelete = ()=>{
    if(!window.confirm(`${bbs_id}를 삭제하시겠습니까?`)) return;
    axios.delete(`/bbs/${bbs_id}`);
    alert("삭제되었습니다 목록으로 이동합니다.");
    window.location.href='/web/customer/bbs'
  }
  
  const onClickNavi = ()=> {
    window.location.href=`/web/customer/bbs/update/${bbs_id}`;  
    
  }



  return (
    <Container>
      <h2 className='text-center mb-4'>고객 게시판</h2>
     
     <Row>
      <Col>
        <Card>
          <Card.Header>
            <h5>{form.bbs_title}</h5>
          </Card.Header>
          <Card.Body style={{ whiteSpace: 'pre-wrap' }}>
          <h5>{form.bbs_content}</h5>
          </Card.Body>
        </Card>
      </Col>
     </Row>
     
        {form.bbs_writer == sessionStorage.getItem('visitor_id') &&
        <div>
            <Button className='me-2' variant='outline-primary btn-sm'
                onClick={onClickDelete}
            >글삭제</Button>
            <Button variant='outline-success btn-sm' 
            onClick={onClickNavi}
            >수정</Button>
        </div>
        }
    </Container>
  )
}

export default WEB_BBSReadPage