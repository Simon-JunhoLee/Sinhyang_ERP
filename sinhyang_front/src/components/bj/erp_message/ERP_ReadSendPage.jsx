import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap';
import moment from 'moment';
import { IoIosArrowBack } from "react-icons/io";

const ERP_ReadSendPage = () => {
    const {message_id} = useParams();
    const [list, setList] = useState([]);
    

    const callAPI = async() => {
        const res= await axios.get(`/erp/sendmessage/read/${message_id}`)
       // console.log(res.data);
        setList(res.data);
    }
  
  
    useEffect(()=>{
      callAPI();
    }, []);
    
    
    return (
      <div>
        <a href='/erp/message/send'>
        <IoIosArrowBack />보낸 메일함
        </a>
        <hr/>
        <h3>
            {list.message_title}
        </h3>
        <div>
            보낸사람: {list.message_sender}
        </div>
        <div className='mt-1'>
            받은사람: {list.message_receiver}
        </div>
        <div className='mt-2' style={{fontSize:'13px'}}>
        {moment(list.message_senddate).format('yy년MM월DD일 HH시mm분')}
        </div>
   
        <hr/>
        <Card>
            <Card.Body className='card-body-contents' style={{ whiteSpace: 'pre-wrap' }}>
                {list.message_content}
            </Card.Body>
        </Card>
      </div>
    )
  }
  

export default ERP_ReadSendPage