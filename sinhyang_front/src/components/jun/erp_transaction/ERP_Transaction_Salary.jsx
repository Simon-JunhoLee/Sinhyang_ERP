import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Slider from 'react-slick';
import ERP_Transaction_Member from './ERP_Transaction_Member';

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

const ERP_Transaction_Salary = () => {

    // 금액에 천 단위 구분 기호를 추가하는 함수
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

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

    useEffect(() => {
        callAccount();
    }, [accountNumber]);

    return (
        <div className='px-3'>
            <div className='mb-5'>
                <h2>급여관리</h2>
            </div>
            <div className='mb-5 px-5'>

            </div>
            <div className='px-5'>
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
                    {accountNumber && <ERP_Transaction_Member account_number={accountNumber} callAccount={callAccount} />}
                </Row>
            </div>
        </div>
    )
}

export default ERP_Transaction_Salary