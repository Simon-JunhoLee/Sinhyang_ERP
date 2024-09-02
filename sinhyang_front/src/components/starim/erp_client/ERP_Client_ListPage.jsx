import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import ERP_Client_ReadPage from './ERP_Client_ReadPage';
import Swal from 'sweetalert2';

const ERP_Client_ListPage = () => {



    const [list, setList] = useState([]);

    const callAPI = async () => {

        const res = await axios.get(`/erp/client`)
        //console.log(res.data);
        setList(res.data);

    }

    useEffect(() => {
        callAPI();
    }, [])


    const onClickClientInsert = (e) => {
        window.location.href = "/erp/client/insert";
    }

    const onClickClientDelete = async (client) => {
        Swal.fire({
            title: `${client.client_id}를 삭제하시겠습니까?`,
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "삭제"

        }).then(async (result) => {
            const client_id = client.client_id;
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/erp/client/${client_id}`);
                    Swal.fire({
                        title: "성공",
                        text: "거래처를 삭제하였습니다.",
                        icon: "success"
                    });
                    callAPI();
                } catch {
                    Swal.fire({
                        title: "에러",
                        text: "삭제에 실패했습니다!",
                        icon: "error"
                    });
                }
            }
        });
    };



    return (
        <Row className='my-3'>
            <Col>
                <h1>고객사리스트</h1>
                <div className='mt-5 mb-3'>
                    <Button onClick={onClickClientInsert}>고객등록</Button>
                </div>
            </Col>
            <Col lg={12}>
                <Table>
                    <thead>
                        <tr>
                            <td>코드</td>
                            <td>이름</td>
                            <td>담당직원</td>
                            <td>전화번호</td>
                            <td>삭제</td>
                        </tr>

                    </thead>
                    <tbody>
                        {list && list.map(client =>
                            <tr key={client.client_id}>
                                <td><div style={{ cursor: "pointer" }}><ERP_Client_ReadPage client={client} /></div></td>
                                <td>{client.client_name}</td>
                                <td>{client.client_employee}({client.member_info_name})</td>
                                <td>{client.client_phone}</td>
                                <td><Button onClick={() => onClickClientDelete(client)}>삭제</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default ERP_Client_ListPage