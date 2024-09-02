import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { Button, Card, Col, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';
import Swal from 'sweetalert2';

const ERP_EmployBBSReadPage = () => {
    const { employ_bbs_id } = useParams();
    const [list, setList] = useState('');
    const [loading, setLoading] = useState(true);

    const callAPI = async () => {
        const res = await axios.get(`/employ/bbs/${employ_bbs_id}`);
        //console.log(res.data);
        setList(res.data);
        setLoading(false);
    }

    useEffect(() => {
        callAPI();
    }, []);

    const onDelete = async()=> {
        Swal.fire({
            title: `${list.employ_bbs_id}번 채용공고를 삭제하실래요?`,
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "예"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`/employ/bbs/${list.employ_bbs_id}`);
                Swal.fire({
                    title: "성공",
                    text: "채용공고를 삭제하였습니다.",
                    icon: "success"
                });
                window.location.href='/erp/employ';
            }
        });
    }

    
    const onClickType = async () => {
        Swal.fire({
            title: `${list.employ_bbs_id}게시글을 접수상태로 업데이트하겠습니까?`,
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "예"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put(`/employ/bbs/1`, list, employ_bbs_id);
                Swal.fire({
                    title: "성공",
                    text: "채용상태 업데이트 완료",
                    icon: "success"
                });
                window.location.href="/erp/employ";
            }
        });
    }

    const onClickReset = async () => {
        Swal.fire({
            title: `${list.employ_bbs_id}게시글을 완료상태로 업데이트하겠습니까?`,
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "예"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put(`/employ/bbs/0`, list, employ_bbs_id);
                Swal.fire({
                    title: "성공",
                    text: "채용상태를 해제하였습니다.",
                    icon: "success"
                });
                window.location.href="/erp/employ";
            }
        });
    }

       
    if (loading) {
        return <h1 className='text-center my-5'><Spinner animation="border" variant="primary" /></h1>;
      }

    return (
        <div>
            <a href='/erp/employ'>
                <IoIosArrowBack /> 채용공고로
            </a>
            <hr />
            <Row className="d-flex justify-content-between align-items-center mb-2">
                <Col>
                    <div className='ms-5'>
                        <strong>{list.employ_bbs_title}</strong>
                        <div style={{ fontSize: '13px' }}>등록일: {moment(list.employ_bbs_regdate).format('yy년MM월DD일 HH시mm분')}</div>
                        <div style={{ fontSize: '13px' }}>조회수: {list.employ_bbs_viewcnt}</div>
                    </div>

                </Col>
                {sessionStorage.getItem('member_info_id')===list.employ_bbs_admin &&
                <Col className="text-end me-3">
                    {list.employ_bbs_type=== 0 ?
                        <Button className='me-2' onClick={onClickType}
                            variant='outline-success btn-sm'>채용상태 업데이트</Button>
                            :
                            <Button className='me-2' onClick={onClickReset}
                            variant='outline-success btn-sm'>채용완료 업데이트</Button>
                        }
                    <Button className='me-2' onClick={onDelete} 
                        variant='outline-danger btn-sm'>삭제</Button>
             
                <a href={`/erp/employ/update/${list.employ_bbs_id}`}>
                    <Button variant='outline-primary btn-sm'>수정</Button>
                </a>        
                </Col>
                }
            </Row>

            <hr />
            <Card>
                <Card.Body style={{ whiteSpace: 'pre-wrap' }}>
                    {list.employ_bbs_contents}
                </Card.Body>
            </Card>
        </div>
    )
}

export default ERP_EmployBBSReadPage