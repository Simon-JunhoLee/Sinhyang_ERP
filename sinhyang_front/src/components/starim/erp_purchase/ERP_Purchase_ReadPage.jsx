import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Card, Col, Form, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

const ERP_Purchase_ReadPage = ({purchase}) => {

    const [totalAmount, setTotalAmount] = useState(0);


    const [page, setPage] = useState(1);
    const [size] = useState(150);
    const [key, setKey] = useState("title");
    const [word, setWord] = useState("");

    const [master, setMasert] = useState({
        purchase_id : purchase.purchase_id,
        purchase_employee : purchase.purchase_employee,
        purchase_location : purchase.purchase_location,
        purchase_date : purchase.purchase_date,
    });

    const [items, setItems] = useState([{
        purchase_info_id:"",
        purchase_items_id:"",
        purchase_qnt : "",
        purchase_warehouse : "",
        purchase_price : ""
    }]);

    const {purchase_employee, purchase_location, purchase_date,  purchase_id } = master;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

     //거래처불러오기
     const [vendorList, setVendorList] = useState([]);
     const [warehouseList, setWarehouseList] = useState([]);
     const [memberList, setMemberList] = useState([]);
     
     const callAPIVendor = async () => {
         const res = await axios.get(`/erp/vendor`)
         setVendorList(res.data);
 
     }
     
    //저장창고불러오기
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
        const res = await axios.get(`/erp/purchase/info/${purchase_id}`)
        //console.log(res.data);
        setItems(res.data);
    }
     
 
     useEffect(()=>{
         callAPIVendor();
         callAPIWarehouse();
         callAPIMember();
         callAPIItems();
     },[])


     const onChangeMaster = (e) => {
        setMasert({ ...master, [e.target.name]: e.target.value});
      };

      const onClickPurchaseUpdate = async () => {
        if(purchase_employee==="0" || purchase_location==="0"){
            Swal.fire({
                title: "에러",
                text: "모든정보를 입력하세요!",
                icon: "error"
            });
            return;
        }
        Swal.fire({
            title: `${purchase.purchase_id}의 구매정보를 수정하시겠습니까?`,
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "예"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put(`/erp/purchase`, master);
                await Promise.all(items.map(item => axios.put(`/erp/purchase/info`, item)));
                Swal.fire({
                    title: "성공",
                    text: "수정완료.",
                    icon: "success"
                })
                handleClose();
                callAPIItems();
            }
        });
    }

    const onClickDelete = async (item) => {
        Swal.fire({
            title: `${item.purchase_info_id}의 구매를 삭제하시겠습니까?`,
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "삭제"
            
        }).then(async (result) => {
            const purchase_info_id = item.purchase_info_id;
            if (result.isConfirmed) {
                await axios.delete(`/erp/purchase/info/${purchase_info_id}`);
                Swal.fire({
                    title: "삭제완료",
                    text: "구매목록을 삭제하였습니다!",
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

    useEffect(() => {
        // 아이템의 총액 합계 계산
        let total = 0;
        items.forEach(item => {
            const subtotal = parseInt(item.purchase_price) * parseInt(item.purchase_qnt);
            total += subtotal;
        });
        setTotalAmount(total);
    }, [items]);



  return (
    <>
        <div onClick={handleShow}>
            {purchase.purchase_id}
        </div>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>{purchase.purchase_id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col lg={2}>
                                        <div>일자:</div>
                                    </Col>
                                    <Col >
                                        <Form.Control type='date' value={new Date(purchase_date).toISOString().substring(0, 10)} name='purchase_date' onChange={onChangeMaster}/>
                                    </Col>
                                    <Col lg={2}>
                                        구매처 : 
                                    </Col>
                                    <Col>
                                        <Form.Select value={purchase_location} name='purchase_location' onChange={onChangeMaster}>
                                            <option value={0} >구매처를선택하세요</option>
                                            {vendorList && vendorList.map(ven=>
                                                <option key={ven.vendor_id} value={ven.vendor_id} >
                                                    {ven.vendor_id}({ven.vendor_name})
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
                                        <Form.Select value={purchase_employee} name='purchase_employee' onChange={onChangeMaster} >
                                            <option value={0}>담당자를선택하세요</option>
                                            {memberList && memberList.map(mem=>
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
                                                    <td>입고창고</td>
                                                    <td>삭제</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items && items.map((item, index)=>
                                                <tr key={item.purchase_info_id}>
                                                    <td><Form.Control value={item.purchase_items_id}/> </td>
                                                    <td><Form.Control value={item.purchase_qnt.toLocaleString()} name='purchase_qnt' onChange={(e)=>onChangeItem(e, index)} /></td>
                                                    <td><Form.Control value={item.purchase_price.toLocaleString()} name='purchase_price' onChange={(e)=>onChangeItem(e, index)}/></td>
                                                    <td><Form.Control value={Math.ceil(`${item.purchase_price}` * 0.1).toLocaleString() + "원"} /></td>
                                                    <td><Form.Control value={Math.ceil(`${item.purchase_price}` * 1.1 * `${item.purchase_qnt}`).toLocaleString() + "원"} /></td>
                                                    <td>
                                                        <Form.Select value={parseInt(item.purchase_warehouse)} name='purchase_warehouse' onChange={(e)=>onChangeItem(e, index)}>
                                                            <option value={0}>입고창고를선택하세요</option>
                                                            {warehouseList && warehouseList.map(ware=>
                                                                <option key={ware.warehouse_id} value={ware.warehouse_id} >
                                                                    {ware.warehouse_id}({ware.warehouse_name})
                                                                </option>
                                                            )}
                                                        </Form.Select>
                                                    </td>
                                                    <td>
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
                <Button variant="primary" onClick={onClickPurchaseUpdate}>수정하기</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default ERP_Purchase_ReadPage