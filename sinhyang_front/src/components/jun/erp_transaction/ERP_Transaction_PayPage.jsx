import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Slider from 'react-slick';
import Swal from 'sweetalert2';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ color: 'gray', fontSize: '2.5rem' }}
            onClick={onClick}>
            <BiChevronRight />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ color: 'gray', fontSize: '2.5rem' }}
            onClick={onClick}>
            <BiChevronLeft />
        </div>
    );
}


const ERP_Transaction_PayPage = ({ purchase }) => {
    const [page, setPage] = useState(1);
    const [size] = useState(150);
    const [key, setKey] = useState("title");
    const [word, setWord] = useState("");

    const [master, setMaster] = useState({
        purchase_id: purchase.purchase_id,
        purchase_employee: purchase.purchase_employee,
        purchase_location: purchase.purchase_location,
        purchase_date: purchase.purchase_date,
    });

    const [items, setItems] = useState([{
        purchase_info_id: "",
        purchase_items_id: "",
        purchase_qnt: "",
        purchase_warehouse: "",
        purchase_price: ""
    }]);

    // 금액에 천 단위 구분 기호를 추가하는 함수
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const { purchase_employee, purchase_location, purchase_date, purchase_id } = master;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 계좌 불러오기
    const [accounts, setAccounts] = useState([]);
    const [accountNumber, setAccountNumber] = useState('');
    const [index, setIndex] = useState(0);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        afterChange: index => {
            setAccountNumber(accounts[index].account_number);
            setIndex(index);
        }
    };

    const callAccount = async () => {
        const url = '/erp/account';
        const res = await axios.get(url);
        setAccounts(res.data);
        if (res.data.length > 0) {
            setAccountNumber(res.data[index].account_number);
        }
        // console.log(accountNumber);
    }

    // 거래처불러오기
    const [vendorList, setVendorList] = useState([]);
    const [warehouseList, setWarehouseList] = useState([]);
    const [memberList, setMemberList] = useState([]);

    const callVendor = async () => {
        const res = await axios.get(`/erp/vendor`)
        setVendorList(res.data);
        // console.log(res.data);
    }

    // 저장창고불러오기
    const callWarehouse = async () => {
        const res = await axios.get("/erp/warehouse");
        setWarehouseList(res.data);
    }

    // 담당자불러오기
    const callMember = async () => {
        const res = await axios.get(`/erp/member?key=${key}&word=${word}&page=${page}&size=${size}`)
        setMemberList(res.data.list);

    }

    // 아이템들불러오기
    const callItems = async () => {
        const res = await axios.get(`/erp/purchase/info/${purchase_id}`);
        // console.log(res.data);
        setItems(res.data);
    }


    useEffect(() => {
        callVendor();
        callWarehouse();
        callMember();
        callItems();
        callAccount();
    }, [accountNumber]);

    const onClickPurchase = async () => {
        if (!accounts) {
            Swal.fire({
                title: "송금할 계좌를 선택하세요.",
                text: "",
                icon: "error"
            });
            return;
        }
        Swal.fire({
            title: `${purchase_location}(${vendorList.find(vendor => vendor.vendor_id === purchase_location)?.vendor_name || ""})에 송금하시겠습니까?`,
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const totalAmount = Math.round(items.reduce((total, item) => total + (item.purchase_price * item.purchase_qnt * 1.1), 0));
                const transactionData = {
                    account_number: accountNumber,
                    transaction_withdraw: totalAmount,
                    purchase_id,
                    vendor_id: purchase_location,
                    purchase_type: 1,
                }
                await axios.post(`/erp/transaction`, transactionData);
                Swal.fire({
                    title: "대금 송금 완료",
                    text: "",
                    icon: "success"
                }).then(() => {
                    handleClose();
                    callItems();
                    window.location.reload();
                });
            }
        });
    }


    return (
        <>
            <div onClick={handleShow}>
                <Button>상세보기</Button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{purchase.purchase_id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='account my-5'>
                        <Slider {...settings}>
                            {accounts.map((account, index) =>
                                <Col key={account.account_number}>
                                    <Card className='account-component me-2 text-center align-items-center' style={{ position: 'relative' }}>
                                        <Card.Body className='mt-3' style={{ backgroundImage: 'url(/images/logo/visa.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', position: 'relative' }}>
                                            <div className='mt-5'>
                                                <h3>{account.account_name}</h3>
                                            </div>
                                            <div>
                                                <h6>{account.account_detail}</h6>
                                            </div>
                                            <div>
                                                <h5>{formatNumber(account.account_total)}원</h5>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Slider>
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>
                                    <Row>
                                        <Col lg={4}>
                                            <div>
                                                일자 : {new Date(purchase_date).toISOString().substring(0, 10)}
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div>
                                                거래처 : {purchase_location}({vendorList.find(vendor => vendor.vendor_id === purchase_location)?.vendor_name || ""})
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div>
                                                담당자 : {purchase_employee}({memberList.find(mem => mem.member_info_id === purchase_employee)?.member_info_name || ""})
                                            </div>
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
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items && items.map((item) =>
                                                        <tr key={item.purchase_items_id}>
                                                            <td>{item.purchase_items_id}</td>
                                                            <td>{formatNumber(parseInt(item.purchase_qnt))}</td>
                                                            <td>{formatNumber(item.purchase_price)}</td>
                                                            <td>{formatNumber(Math.ceil(item.purchase_price * 0.1))}원</td>
                                                            <td>{formatNumber(Math.ceil(item.purchase_price * 1.1 * item.purchase_qnt))}원</td>
                                                            <td>
                                                                {item.purchase_warehouse}
                                                                ({warehouseList.find(ware => ware.warehouse_id === item.purchase_warehouse)?.warehouse_name || ""})
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer>
                                    총 금액: {formatNumber(Math.round(items.reduce((total, item) => total + (item.purchase_price * item.purchase_qnt * 1.1), 0)))}원
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onClickPurchase}>송금하기</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ERP_Transaction_PayPage