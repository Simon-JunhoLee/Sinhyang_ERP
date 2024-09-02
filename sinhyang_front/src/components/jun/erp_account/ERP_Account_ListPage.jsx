import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Modal, Row, Table } from 'react-bootstrap';
import { BiChevronLeft, BiChevronRight, BiTrash } from 'react-icons/bi';
import Slider from "react-slick";
import ERP_Transaction_ListPage from '../erp_transaction/ERP_Transaction_ListPage';
import ERP_Account_InsertPage from './ERP_Account_InsertPage';
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


const ERP_Account_ListPage = () => {

    const [accounts, setAccounts] = useState([]);
    const [accountNumber, setAccountNumber] = useState('');
    const [index, setIndex] = useState(0);
    const [transactions, setTransactions] = useState([]);

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
            setIndex(index);
            if (index < accounts.length) {
                // 통장 목록 슬라이드를 선택한 경우
                setAccountNumber(accounts[index].account_number);
            } else {
                // 통장등록 슬라이드를 선택한 경우
                setAccountNumber('');
            }
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

    useEffect(() => {
        callAccount();
    }, []);

    useEffect(() => {
        if (accountNumber) {
            // Do something if accountNumber is set, e.g., fetching account details
        }
    }, [accountNumber]);

    // 금액에 천 단위 구분 기호를 추가하는 함수
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const onDeleteAccount = async () => {
        const url = `/erp/account/${accountNumber}`;
        // console.log(accountNumber);
        Swal.fire({
            title: `해당 계좌를 삭제하시겠습니까?`,
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (transactions) {
                    Swal.fire({
                        title: "계좌 삭제 불가!",
                        text: "해당 계좌는 거래내역이 있어, 삭제가 불가능합니다.",
                        icon: "error"
                    });
                    return;
                }
                await axios.delete(url);
                Swal.fire({
                    title: "계좌 삭제 완료!",
                    text: "",
                    icon: "success"
                }).then(() => {
                    window.location.href = `/erp/account/list`;
                });
            }
        });
    }

    return (
        <div className='px-3'>
            <div className='mb-5'>
                <h2>자금현황</h2>
            </div>
            <Row className='account'>
                <Slider {...settings}>
                    {accounts.map((account, index) =>
                        <Col key={account.account_number}>
                            <Card className='account-component me-2 text-center align-items-center' style={{ position: 'relative' }}>
                                <Card.Body className='mt-3' style={{ backgroundImage: 'url(/images/logo/visa.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: 10, right: 10 }}>
                                        <BiTrash size={24} style={{ cursor: 'pointer' }} onClick={onDeleteAccount} />
                                    </div>
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
                    <Col>
                        <Card className='account-component me-2 text-center align-items-center'>
                            <ERP_Account_InsertPage />
                        </Card>
                    </Col>
                </Slider>
                {accountNumber ? <ERP_Transaction_ListPage account_number={accountNumber} transactions={transactions} setTransactions={setTransactions} /> : <></>}
            </Row>
        </div>
    )
}

export default ERP_Account_ListPage