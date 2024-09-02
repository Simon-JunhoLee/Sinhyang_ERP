import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ERP_EmployBBSUpdatePage = () => {
    const { employ_bbs_id } = useParams();
    const [list, setList] = useState({
        employ_bbs_admin:sessionStorage.getItem('member_info_id'),
        employ_bbs_title:'',
        employ_bbs_contents:''
    });

    const {employ_bbs_title, employ_bbs_contents} = list;

    const callAPI = async () => {
        const res = await axios.get(`/employ/bbs/${employ_bbs_id}`);
       // console.log(res.data);
        setList(res.data);
    }

    useEffect(() => {
        callAPI();
    }, []);

    
    const onChangeForm = (e) => {
        setList({...list, [e.target.name]:e.target.value});
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        Swal.fire({
            title: '변경한 내용을 수정하실래요?',
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "예"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put('/employ/bbs/update', list);
                window.location.href=`/erp/employ/read/${employ_bbs_id}`;
            }
        });
    }

    const onReset = () => {
        if(!window.confirm('변경된 내용을 취소하실래요?')) return;
        callAPI();
      }

  return (
    <div>
        <div className="text-center mb-4">채용공고 수정</div>
            <a href='/erp/employ'>
            <IoIosArrowBack /> 채용공고 페이지로
            </a>
        <hr/>
     

    <form onSubmit={onSubmit} onReset={onReset}>
        <div className=" mb-2">

            <Button type='submit'
                className="btn-sm me-2" variant="outline-primary">
                수정
            </Button>
            <Button type='reset'
                className="btn-sm" variant="outline-danger">
                취소
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
            rows={25}
            style={{ width: '90%' }}
            placeholder="내용"/>


    </form>
  </div>
  )
}

export default ERP_EmployBBSUpdatePage