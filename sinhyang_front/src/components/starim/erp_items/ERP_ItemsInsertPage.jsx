import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import Swal from 'sweetalert2';

const ERP_ItemsInsertPage = () => {

    const [file, setFile] = useState({
        name:"",
        byte:""
    });

    const [form, setForm] = useState({
        items_id : "",
        items_name : "",
        items_photo : "",
        items_type : ""
    });
    const {items_id, items_name, items_photo, items_type} = form;

    const refFile = useRef();


    const photoStyle ={
        borderRadius : "10px",
        cursor: "pointer",
        border : "10px groove gray"
    }


    const onChangeFile = (e) => {
        if (e.target.files.length > 0) {
            setFile({
                name: URL.createObjectURL(e.target.files[0]),
                byte: e.target.files[0]
            });
        } 
    }
    


    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
      };


    const onClickInsertTogether = async() => {
        if(items_id==="" || items_name==="" || items_type==="" || file.byte===""){
            Swal.fire({
                title: "에러",
                text: "모든정보를 입력하세요!",
                icon: "error"
            });
            return;
        }
        Swal.fire({
            title: "물품을 등록하시겠습니까??",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "등록"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.post(`/erp/items`, form)
                const newItems_id = res.data;
                const formData = new FormData();
                formData.append("byte", file.byte);
                await axios.post(`/erp/items/update/image/${newItems_id}`, formData);
                window.location.href="/erp/items/list"
                Swal.fire({
                    title: "등록완료",
                    text: "물품이 등록되었습니다.",
                    icon: "success"
                });
            }
        });  
    }



  return (
    <Row className='justify-content-center'>
        <Col lg={10}>
            <Card>
                <Card.Header>
                    <h1>물품등록</h1>
                </Card.Header>
                <Card.Body>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>물품코드</InputGroup.Text>
                        <Form.Control value={items_id}  name='items_id' placeholder='coke_1.5L' onChange={onChangeForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>물품이름</InputGroup.Text>
                        <Form.Control value={items_name} name='items_name' placeholder='물품이름을 입력하세요' onChange={onChangeForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text className='me-5'>물품사진</InputGroup.Text>
                        <img src={file.name || items_photo || "http://via.placeholder.com/50x50"} style={photoStyle} width="20%" onClick={()=>refFile.current.click()} onChange={onChangeForm} />
                        <input ref={refFile} type='file' onChange={onChangeFile} style={{display:"none"}}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>물품타입</InputGroup.Text>
                        <Form.Select value={items_type}  name='items_type' onChange={onChangeForm}>
                            <option>선택하세요</option>
                            <option value={parseInt(0)}>음료</option>
                            <option value={parseInt(1)}>면</option>
                            <option value={parseInt(2)}>스낵</option>
                            <option value={parseInt(3)}>간편식</option>
                        </Form.Select>
                    </InputGroup>
                </Card.Body>
                <Card.Footer>
                    <div>
                        <Button onClick={onClickInsertTogether}>등록</Button>
                    </div>
                    <div>
                        <hr/>
                        <h5>작성요령</h5>
                        <p>물품코드 : 영어이름_규격</p>
                        <p>물품이름 : 한글이름_규격</p>
                        <p>예시 - baehondong_4 // 배홍동_4개입</p>
                    </div>
                    
                </Card.Footer>
            </Card>
        </Col>
    </Row>
  )
}

export default ERP_ItemsInsertPage