import axios from 'axios';
import React, { useRef } from 'react'
import { useState } from 'react';
import { Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';


const ERP_ItemsReadPage = ({item, file, setFile}) => {

    const [show, setShow] = useState(false);
    const refFile = useRef();
    const [form, setForm] = useState({
        items_id : item.items_id,
        items_name : item.items_name,
        items_photo : item.items_photo,
        items_type : item.items_type
    });
    const {items_name, items_photo, items_type} = form;

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setForm({
            items_id : item.items_id,
            items_name : item.items_name,
            items_photo : item.items_photo,
            items_type : item.items_type
        });
    }




    const photoStyle ={
        borderRadius : "10px",
        cursor: "pointer",
        border : "10px groove gray"
    }
    


      const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
      };

      const onUploadImage =async () => {
        if(file){
            if(!window.confirm("변경된 이미지를 저장하시겠습니까?")) return;
            //사진저장하기
            const formData = new FormData();
            formData.append("byte", file.byte);
            await axios.post(`/erp/items/update/image/${item.items_id}`, formData);
            //console.log(formData)
            alert("이미지 변경 완료")
        }else{
            alert("사진을 변경해주세요")
        }
    }
    
    const onClickItemUpdate = async () => {
        if(items_name==="" || items_type===""){
            alert("모든정보를 입력하세요")
            return;
        }
        Swal.fire({
            title: `${item.items_id}의 물품정보를 수정하시겠습니까?`,
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "등록"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put(`/erp/items`, form);
                Swal.fire({
                    title: "성공",
                    text: "물품정보를 수정하였습니다.",
                    icon: "success"
                });
                handleClose();
                window.location.reload();
            }
        });
    }

    const onChangeFile = (e) => {
        setFile({
            name:URL.createObjectURL(e.target.files[0]),
            byte:e.target.files[0]
        });
    }
    
   

  return (

    <>
        <div onClick={handleShow}>
        {item.items_id}
        </div>

            <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size='lg'
            >
            <Modal.Header closeButton>
                <Modal.Title>{item.items_id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='justify-content-center'>
                    <Col>
                        <Card>
                            <Card.Header>
                                <h1>물품정보</h1>
                            </Card.Header>
                            <Card.Body>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>물품코드</InputGroup.Text>
                                    <Form.Control value={item.items_id} name='items_id' readOnly placeholder='coke_1.5L' />
                                </InputGroup>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>물품이름</InputGroup.Text>
                                    <Form.Control value={items_name} name ='items_name' placeholder='물품이름을 입력하세요' onChange={onChangeForm}/>
                                </InputGroup>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text className='me-5'>물품사진</InputGroup.Text>
                                    <img src={file.name || items_photo || "http://via.placeholder.com/50x50"} style={photoStyle} width="50%" onClick={()=>refFile.current.click()}  />
                                    <input ref={refFile} type='file' onChange={onChangeFile} style={{display:"none"}}/>
                                    <Button variant='outline-success' size='sm' className='mt-1 w-100' onClick={onUploadImage}>이미지 저장</Button>
                                </InputGroup>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>물품타입</InputGroup.Text>
                                    <Form.Select value={items_type}  name='items_type' onChange={onChangeForm}>
                                        <option value={""}>선택하세요</option>
                                        <option value={parseInt(0)}>음료</option>
                                        <option value={parseInt(1)}>면</option>
                                        <option value={parseInt(2)}>스낵</option>
                                        <option value={parseInt(3)}>간편식</option>
                                    </Form.Select>
                                </InputGroup>
                            </Card.Body>
                            <Card.Footer>
                                <div>
                                    <Button onClick={onClickItemUpdate}>수정하기</Button>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>

    </>
    
  )
}

export default ERP_ItemsReadPage