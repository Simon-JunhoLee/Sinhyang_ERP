import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import moment from 'moment';
import { IoIosArrowBack } from "react-icons/io";

const ERP_ReadReceivePage = () => {
  const { message_id } = useParams();
  const [list, setList] = useState([]);
  const navi = useNavigate();



  const callAPI = async () => {
      const res = await axios.get(`/erp/receivemessage/read/${message_id}`);
      setList(res.data);


    
  }

  useEffect(() => {
    callAPI();
  }, []);

  const onClciksend = () => {
    navi('/erp/message/insert', { state: { receiver: list.message_sender } });
  };

  return (
    <div>
      <a href='/erp/message/receive'>
        <IoIosArrowBack />받은 메일함
      </a>
      <Button className='ms-3' variant='outline-success btn-sm' onClick={onClciksend}>
        답장하기
      </Button>
      <hr />
      <h3>
        {list.message_title}
      </h3>
      <div>
        보낸사람: {list.message_sender}
      </div>
      <div className='mt-1'>
        받은사람: {list.message_receiver}
      </div>
      <div className='mt-2' style={{ fontSize: '13px' }}>
        {moment(list.message_senddate).format('yy년MM월DD일 HH시mm분')}
      </div>
      <hr />
      <Card>
        <Card.Body className='card-body-contents' style={{ whiteSpace: 'pre-wrap' }}>
          {list.message_content}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ERP_ReadReceivePage;
