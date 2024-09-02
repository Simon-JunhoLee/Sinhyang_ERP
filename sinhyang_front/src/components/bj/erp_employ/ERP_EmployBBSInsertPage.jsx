import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { IoIosArrowBack } from "react-icons/io";
import Swal from 'sweetalert2';

const ERP_EmployBBSInsertPage = () => {
    const [form, setForm] = useState({
        employ_bbs_admin:sessionStorage.getItem('member_info_id'),
        employ_bbs_title:'',
        employ_bbs_contents:''
    });

    const {employ_bbs_admin, employ_bbs_title, employ_bbs_contents} = form;

    const onChangeForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        Swal.fire({
            title: "채용공고를 등록 하시겠습니까?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "등록"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.post('/employ/bbs/insert', form);
                window.location.href='/erp/employ';
            }
        });
    }


  return (
    <div>
        <div className="text-center mb-4">채용공고 쓰기</div>
            <a href='/erp/employ'>
            <IoIosArrowBack /> 채용공고 페이지로
            </a>
        <hr/>
     

    <form onSubmit={onSubmit}>
        <div className=" mb-2">

            <Button type='submit'
                className="btn-sm" variant="outline-primary">
                등록
            </Button>
        </div>

     
        <Form.Control
           name='employ_bbs_title' value={employ_bbs_title} onChange={onChangeForm}
           className="mb-2"
           rows={1}
           style={{ width: '90%' }}
           placeholder="제목"/>

        <Form.Control
            name='employ_bbs_contents' value={employ_bbs_contents} onChange={onChangeForm}
            as="textarea"
            rows={10}
            style={{ width: '90%' }}
            placeholder="내용"/>


    </form>
  </div>
  )
}

export default ERP_EmployBBSInsertPage