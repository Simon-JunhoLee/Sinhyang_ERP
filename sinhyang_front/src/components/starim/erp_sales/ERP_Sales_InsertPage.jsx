import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap'
import ERP_Items_Modal from '../starim_common/ERP_Items_Modal';
import Swal from 'sweetalert2';

const ERP_Sales_InsertPage = () => {

    const todayDate = new Date().toISOString().split('T')[0];
    const [page] = useState(1);
    const [size] = useState(100);
    const [key] = useState("title");
    const [word] = useState("");



    const [master, setMaster] = useState({
        sales_employee: "",
        sales_location: "",
        sales_date: todayDate
    });

    const [items, setItems] = useState([{
        sales_items_id: '',
        sales_qnt: "",
        sales_warehouse: "",
        sales_price: ""
    }]);




    const [clientList, setClientList] = useState([]);
    const [warehouseList, setWarehouseList] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const [isClick, setIsClick] = useState(false);

    //거래처불러오기
    const callAPIClient = async () => {
        const res = await axios.get(`/erp/client`)
        //console.log(res.data);
        setClientList(res.data);

    }

    //담당자불러오기
    const callAPIMember = async () => {
        const res = await axios.get(`/erp/member?key=${key}&word=${word}&page=${page}&size=${size}`)
        //console.log(res.data.list);
        setMemberList(res.data.list);

    }

    //출하창고불러오기
    const callAPIWarehouse = async () => {
        const res = await axios.get("/erp/warehouse");
        setWarehouseList(res.data);

    }

    useEffect(() => {
        callAPIClient();
        callAPIWarehouse();
        callAPIMember();
    }, [])


    const onClickAdd = () => {
        const item = {
            sales_items_id: '',
            sales_qnt: "",
            sales_warehouse: "",
            sales_price: "",
        };
        setItems(items.concat(item))
    }
    const onClickDelete = (index) => {
        setItems(items.filter((idx) => idx !== index));
        //console.log(index);
    };

    const onChangeItem = (e, index) => {
        const number = parseInt(e.target.value.replace(/,/g, ''));
        const data = items.map((item, idx) => index === idx ? { ...item, [e.target.name]: number } : item);
        setItems(data);
    }

    const onChageMaster = (e) => {
        const data = { ...master, [e.target.name]: e.target.value };
        setMaster(data);
        //console.log(data);
    }

    const onClickSaleInsert = async () => {
        if (isClick) return;


        if (!master.sales_date || !master.sales_location || !master.sales_employee) {
            Swal.fire({
                title: "에러",
                text: "모든정보를 입력하세요!",
                icon: "error"
            });
            setIsClick(false);
            return;
        }
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (!item.sales_qnt || !item.sales_price || !item.sales_warehouse) {
                Swal.fire({
                    title: "에러",
                    text: "모든정보를 입력하세요!",
                    icon: "error"
                });
                setIsClick(false);
                return;
            }
        }
        Swal.fire({
            title: "판매정보를 등록하시겠습니까?",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "등록"

        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.post(`/erp/sales`, master)
                const sales_id = res.data;
                sales_id && await Promise.all(items.map(item => axios.post(`/erp/sales/info`, { ...item, sales_id })));
                setIsClick(true);
                Swal.fire({
                    title: "성공",
                    text: "판매정보를 수정하였습니다.",
                    icon: "success"
                });
                window.location.href = "/erp/sales/list"
            }
        });
    };


    return (
        <>
            <Row className='justify-content-center'>
                <Col lg={12}>
                    <h1>판매작성</h1>
                    <Card>
                        <Card.Header>

                            <Row className='mb-2'>
                                <Col lg={1}>
                                    <div className='align-middle mt-2'>일자:</div>
                                </Col>
                                <Col lg={5}>
                                    <Form.Control type='date' value={master.sales_date} name='sales_date' onChange={onChageMaster} />
                                </Col>
                                <Col lg={1}>
                                    <div className='align-middle mt-2'>판매처 : </div>
                                </Col>
                                <Col lg={5}>
                                    <Form.Select value={master.sales_location} name='sales_location' onChange={onChageMaster}  >
                                        <option>판매처를선택하세요</option>
                                        {clientList && clientList.map(cli =>
                                            <option key={cli.client_id} value={cli.client_id}>
                                                {cli.client_id}({cli.client_name})
                                            </option>
                                        )}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={1}>
                                    <div className='align-middle mt-2'>담당자:</div>
                                </Col>
                                <Col lg={11}>
                                    <Form.Select value={master.sales_employee} name='sales_employee' onChange={onChageMaster}>
                                        <option >담당자를선택하세요</option>
                                        {memberList && memberList.map(mem => mem.dept_name.includes("영업") && mem.member_info_job !== '퇴사' &&
                                            <option key={mem.member_info_id} value={mem.member_info_id}>{mem.member_info_id}({mem.member_info_name})</option>
                                        )}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <div className='text-end'><Button className='mt-3' onClick={onClickAdd} size='sm'>+</Button></div>

                                    <Table>
                                        <thead>
                                            <tr>
                                                <td>품목코드</td>
                                                <td>품목명</td>
                                                <td>수량</td>
                                                <td>단가</td>
                                                <td>부가세</td>
                                                <td>총금액</td>
                                                <td>출하창고</td>
                                                <td>삭제</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items && items.map((item, index) =>
                                                <tr key={item.sales_items_id}>
                                                    <td><ERP_Items_Modal items={items} setItems={setItems} item_index={index} /></td>
                                                    <td><Form.Control value={item.items_name} readOnly /> </td>
                                                    <td><Form.Control value={item.sales_qnt.toLocaleString()} name="sales_qnt" onChange={(e) => onChangeItem(e, index)} maxLength={6} />
                                                    </td>
                                                    <td><Form.Control value={item.sales_price.toLocaleString()} name="sales_price" onChange={(e) => onChangeItem(e, index)} maxLength={7} />
                                                    </td>
                                                    <td><Form.Control value={Math.ceil(`${item.sales_price}` * 0.1) + "원"} readOnly /></td>
                                                    <td><Form.Control value={Math.ceil(`${item.sales_price}` * 1.1 * `${item.sales_qnt}`) + "원"} readOnly /></td>
                                                    <td>
                                                        <Form.Select value={item.sales_warehouse} name="sales_warehouse" onChange={(e) => onChangeItem(e, index)}>
                                                            <option>출하지점</option>
                                                            {warehouseList && warehouseList.map(ware =>
                                                                <option key={ware.warehouse_id} value={parseInt(ware.warehouse_id, 10)} >
                                                                    {ware.warehouse_id}({ware.warehouse_name})
                                                                </option>
                                                            )}
                                                        </Form.Select>
                                                    </td>
                                                    <td><div className='text-end'><Button size='sm' onClick={() => onClickDelete(item, index)}>ㅡ</Button></div></td>
                                                </tr>
                                            )}
                                        </tbody>

                                    </Table>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button className='me-3' onClick={onClickSaleInsert}>판매저장</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ERP_Sales_InsertPage