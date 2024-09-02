import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import ERP_Vendor_ReadPage from './ERP_Vendor_ReadPage';
import Swal from 'sweetalert2';

const ERP_Vendor_ListPage = () => {


    const [list, setList] = useState([]);

    const callAPI = async () => {

        const res = await axios.get(`/erp/vendor`)
        //console.log(res.data);
        setList(res.data);

    }

    useEffect(() => {
        callAPI();
    }, [])


    const onClickVendorInsert = (e) => {
        window.location.href = "/erp/vendor/insert";
    }

    const onClickVendorDelete = async (vendor) => {
        Swal.fire({
            title: `${vendor.vendor_id}를 삭제하시겠습니까?`,
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "삭제"

        }).then(async (result) => {
            const vendor_id = vendor.vendor_id;
            if (result.isConfirmed) {
                await axios.delete(`/erp/vendor/${vendor_id}`);
                callAPI();
            }
        });
    };



    return (
        <Row className='justify-content-center'>
            <h1 className='mt-3'>구매처관리</h1>
            <div className='mt-5 mb-3'>
                <Button onClick={onClickVendorInsert}>구매처등록</Button>
            </div>
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
                        {list && list.map(vendor =>
                            <tr key={vendor.vendor_id}>
                                <td><div style={{ cursor: "pointer" }}><ERP_Vendor_ReadPage vendor={vendor} /></div></td>
                                <td>{vendor.vendor_name}</td>
                                <td>{vendor.vendor_employee}({vendor.member_info_name})</td>
                                <td>{vendor.vendor_phone}</td>
                                <td><Button onClick={() => onClickVendorDelete(vendor)}>삭제</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}


export default ERP_Vendor_ListPage