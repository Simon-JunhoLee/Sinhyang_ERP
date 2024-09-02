import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Card, Col, Form, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';


const ERP_Sales_ReadPage = ({sales}) => {

    const [totalAmount, setTotalAmount] = useState(0);

    const [page, setPage] = useState(1);
    const [size] = useState(150);
    const [key, setKey] = useState("title");
    const [word, setWord] = useState("");


    const [master, setMasert] = useState({
        sales_id : sales.sales_id,
        sales_employee : sales.sales_employee,
        sales_location : sales.sales_location,
        sales_date : sales.sales_date,
    });
    
    const [items, setItems] = useState([{
        sales_info_id:"",
        sales_items_id:"",
        sales_qnt : "",
        sales_warehouse : "",
        sales_price : ""
    }]);

    const {sales_employee, sales_location,  sales_date,  sales_id } = master;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        callAPIItems();
    }

     //거래처불러오기
     const [clientList, setClientList] = useState([]);
     const [warehouseList, setWarehouseList] = useState([]);
     const [memberList, setMemberList] = useState([]);
     
     const callAPIClient = async () => {
         
         const res = await axios.get(`/erp/client`)
         //console.log(res.data);
         setClientList(res.data);
 
     }
     
    //출하창고불러오기
     const callAPIWarehouse = async() => {
         const res = await axios.get("/erp/warehouse");
         setWarehouseList(res.data);
     }
 
     //담당자불러오기
     const callAPIMember = async () => {
        const res = await axios.get(`/erp/member?key=${key}&word=${word}&page=${page}&size=${size}`)
        setMemberList(res.data.list);

    }
    //아이템들불러오기
    const callAPIItems = async () => {
        const res = await axios.get(`/erp/sales/info/${sales_id}`)
        //console.log(res.data);
        setItems(res.data);
        
    }
     
 
     useEffect(()=>{
         callAPIClient();
         callAPIWarehouse();
         callAPIMember();
         callAPIItems();
     },[])


     const onChangeMaster = (e) => {
        setMasert({ ...master, [e.target.name]: e.target.value});
      };

      const onClickSaleUpdate = async () => {
        if(sales_employee==="0" || sales_location==="0"){
            Swal.fire({
                title: "에러",
                text: "모든정보를 입력하세요!",
                icon: "error"
            });
            return;
        }
        Swal.fire({
            title: `${sales.sales_id}의 판매정보를 수정하시겠습니까?`,
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "등록"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put(`/erp/sales`, master);
                await Promise.all(items.map(item => axios.put(`/erp/sales/info`, item)));
                Swal.fire({
                    title: "성공",
                    text: "판매정보를 수정하였습니다.",
                    icon: "success"
                });
                handleClose();
            }
        });
    }

    const onClickDelete = async (item) => {
        Swal.fire({
            title: `${item.sales_info_id}의 판매를 삭제하시겠습니까?`,
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "삭제"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                const sales_info_id = item.sales_info_id;
                await axios.delete(`/erp/sales/info/${sales_info_id}`);
                Swal.fire({
                    title: "성공",
                    text: "삭제완료.",
                    icon: "success"
                });
                callAPIItems();
            }
        });
    }



    const onChangeItem = (e, index) => {
        const number = parseInt(e.target.value.replace(/,/g, ''));
        const data=items.map((item, idx)=> index===idx ? {...item, [e.target.name]:number} : item);
        setItems(data);
    }


    const utcDate = new Date(sales_date);
    const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * -60000);
    const formattedDate = localDate.toISOString().substring(0, 10);
    //console.log(formattedDate);


    useEffect(() => {
        // 아이템의 총액 합계 계산
        let total = 0;
        items.forEach(item => {
            const subtotal = parseInt(item.sales_price) * parseInt(item.sales_qnt);
            total += subtotal;
        });
        setTotalAmount(total);
    }, [items]);

  return (
    <>
        <div onClick={handleShow}>
            {sales.sales_id}
        </div>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>{sales.sales_id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Row className='mb-2'>
                                    <Col lg={2}>
                                        <div>일자:</div>
                                    </Col>
                                    <Col >
                                        <Form.Control type='date' value={formattedDate} name='sales_date' onChange={onChangeMaster}/>
                                    </Col>
                                    <Col lg={2}>
                                        판매처 : 
                                    </Col>
                                    <Col>
                                        <Form.Select value={sales_location} name='sales_location' onChange={onChangeMaster}>
                                            <option value={0}>판매처를선택하세요</option>
                                            {clientList && clientList.map(cli=>
                                                <option key={cli.client_id} value={cli.client_id}>
                                                    {cli.client_id}({cli.client_name})
                                                </option>
                                            )}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={2}>
                                        <div>담당자:</div>
                                    </Col>
                                    <Col>
                                        <Form.Select value={sales_employee} name='sales_employee' onChange={onChangeMaster} >
                                            <option value={0}>담당자를선택하세요</option>
                                            {memberList && memberList.map(mem=> mem.dept_name.includes("영업") &&
                                                <option key={mem.member_info_id} value={mem.member_info_id}>{mem.member_info_id}({mem.member_info_name})</option>
                                            )}
                                        </Form.Select>
                                    </Col>
                                    
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <td>품목코드</td>
                                                    <td>수량</td>
                                                    <td>단가</td>
                                                    <td>부가세</td>
                                                    <td>총금액</td>
                                                    <td>출하창고</td>
                                                    <td>삭제</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items && items.map((item, index)=>
                                                <tr key={item.sales_items_id}>
                                                    <td><Form.Control value={item.sales_items_id} readOnly/> </td>
                                                    <td width={"13%"}><Form.Control value={item.sales_qnt.toLocaleString()} name='sales_qnt' onChange={(e)=>onChangeItem(e, index)} maxLength={6} /></td>
                                                    <td width={"13%"}><Form.Control value={item.sales_price.toLocaleString()} name='sales_price' onChange={(e)=>onChangeItem(e, index)} maxLength={6}/></td>
                                                    <td width={"13%"}><Form.Control value={Math.ceil(`${item.sales_price}` * 0.1).toLocaleString() + "원"} readOnly/></td>
                                                    <td><Form.Control value={Math.ceil(`${item.sales_price}` * 1.1 * `${item.sales_qnt}`).toLocaleString() + "원"} readOnly/></td>
                                                    <td>
                                                        <Form.Select value={parseInt(item.sales_warehouse)} name='sales_warehouse' onChange={(e)=>onChangeItem(e, index)}>
                                                            <option value={0}>출하창고를선택하세요</option>
                                                            {warehouseList && warehouseList.map(ware=>
                                                                <option key={ware.warehouse_id} value={ware.warehouse_id} >
                                                                    {ware.warehouse_id}({ware.warehouse_name})
                                                                </option>
                                                            )}
                                                        </Form.Select>
                                                    </td>
                                                    <td width={"8%"}>
                                                        <Button size="sm" onClick={()=>onClickDelete(item)}>삭제</Button>
                                                    </td>
                                                </tr>
                                                )}
                                                <tr>
                                                    <td colSpan={4}></td>
                                                    <td className='text-end'><strong>총액 합계:</strong></td>
                                                    <td><strong>{totalAmount.toLocaleString()}원</strong></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClickSaleUpdate}>수정하기</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default ERP_Sales_ReadPage