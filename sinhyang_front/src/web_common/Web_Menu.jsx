import React, { useState } from 'react'
import { Nav } from 'react-bootstrap';
import { IoPersonCircleOutline } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";

const Web_Menu = () => {
    const [showDropdownCompany, setShowDropdownCompany] = useState(false);
    const [showDropdownWorkplace, setshowDropdownWorkplace] = useState(false);
    const [showDropdownNews, setshowDropdownNews] = useState(false);
    const [showDropdownPerson, setshowDropdownPerson] = useState(false);
    const [showDropdownProduct, setShowDropdownProduct] = useState(false);
    const [showDropdownEmploy, setShowDropdownEmploy] = useState(false);
    const [showDropdownCustomer, setShowDropdownCustomer] = useState(false);
    const [showDropdownLog, setShowDropdownLog] = useState(false);


    const handleMouseOver = (setShowDropdown) => {
        setShowDropdown(true);
    };

    const handleMouseLeave = (setShowDropdown) => {
        setShowDropdown(false);
    };

    const onClickLogout = (e) => {
        e.preventDefault();
        if(window.confirm("로그아웃 하시겠습니까?")){
            alert('로그아웃 완료. 홈으로 이동합니다.')
          sessionStorage.clear();
          window.location.href='/web';
        }
    };

    const vid = sessionStorage.getItem("visitor_id");

    return (

        <div>
            <div className='my-5'>
                <Nav className="web-nav-container d-flex align-items-center justify-content-between web-nav-border">
                    <div className='d-flex align-items-center'>

                        <div className='ms-5'>
                            <a href="/web">
                                <img src="/images/menupage/shlogi3.png" alt="Description" className="web-logo-image" />
                            </a>
                        </div>
                        <a href="/web">
                            <img src="/images/menupage/shlogi.png" alt="Description" className="web-logo-write-image" />
                        </a>
                    </div>

                    <div className="web-menu-items d-flex">

                        <div
                            className='web-menu-item d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setShowDropdownCompany)}
                            onMouseLeave={() => handleMouseLeave(setShowDropdownCompany)}>
                            <a className="web-nav-link-custom" href="#">회사소개</a>
                            {showDropdownCompany && (
                                <div className="web-dropdown1-menu">
                                    <a className="web-dropdown1-item" href="/web/company/view">회사개요</a>
                                    <a className="web-dropdown1-item" href="/web/company/history">회사연혁</a>
                                    <a className="web-dropdown1-item" href="/web/company/ceo">CEO인사말</a>
                                </div>
                            )}
                        </div>

                        <div
                            className='web-menu-item d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setshowDropdownWorkplace)}
                            onMouseLeave={() => handleMouseLeave(setshowDropdownWorkplace)}>
                            <a className="web-nav-link web-nav-link-custom" href="#">사업장소개</a>
                            {showDropdownWorkplace && (
                                <div className="web-dropdown1-menu">
                                    <a className="web-dropdown1-item" href="/web/workspace/world">해외/국내 지사</a>
                                </div>
                            )}
                        </div>

                        <div
                            className='web-menu-item d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setshowDropdownNews)}
                            onMouseLeave={() => handleMouseLeave(setshowDropdownNews)}>
                            <a className="web-nav-link web-nav-link-custom" href="#">뉴스</a>
                            {showDropdownNews && (
                                <div className="web-dropdown1-menu">
                                    <a className="web-dropdown1-item" href="/web/news/domestic">국내</a>
                                    <a className="web-dropdown1-item" href="/web/news/overseas">해외</a>
                                </div>
                            )}
                        </div>

                        <div
                            className='web-menu-item d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setshowDropdownPerson)}
                            onMouseLeave={() => handleMouseLeave(setshowDropdownPerson)}>
                            <a className="web-nav-link web-nav-link-custom" href="#">인물소개</a>
                            {showDropdownPerson && (
                                <div className="web-dropdown1-menu">
                                    <a className="web-dropdown1-item" href="/web/person/organization">회사 조직도</a>
                                </div>
                            )}
                        </div>

                        <div
                            className='web-menu-item d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setShowDropdownProduct)}
                            onMouseLeave={() => handleMouseLeave(setShowDropdownProduct)}>
                            <a className="web-nav-link web-nav-link-custom" href="#">제품</a>
                            {showDropdownProduct && (
                                <div className="web-dropdown1-menu">
                                    <a className="web-dropdown1-item" href="/web/items/read">제품소개</a>
                                </div>
                            )}
                        </div>

                        <div
                            className='web-menu-item d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setShowDropdownEmploy)}
                            onMouseLeave={() => handleMouseLeave(setShowDropdownEmploy)}>
                            <a className="web-nav-link web-nav-link-custom" href="#">인재채용</a>
                            {showDropdownEmploy && (
                                <div className="web-dropdown1-menu">
                                    <a className="web-dropdown1-item" href="/web/employ/procedure">채용절차</a>
                                    <a className="web-dropdown1-item" href="/web/employ/bbs">채용공고</a>
                                </div>
                            )}
                        </div>

                        <div
                            className='web-menu-item d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setShowDropdownCustomer)}
                            onMouseLeave={() => handleMouseLeave(setShowDropdownCustomer)}>
                            <a className="web-nav-link web-nav-link-custom" href="#">고객센터</a>
                            {showDropdownCustomer && (
                                <div className="web-dropdown1-menu">
                                    <a className="web-dropdown1-item" href="/web/customer/bbs">고객게시판</a>
                                    <a className="web-dropdown1-item" href="/web/customer/faq">FAQ</a>
                                </div>
                            )}
                        </div>
                    </div>

                    {sessionStorage.getItem("visitor_id") && <div className='me-1' style={{color:'black'}} >{vid} 님</div>}
                    <div className="web-menu-item web-right-box d-inline-block  me-3" onMouseEnter={() => handleMouseOver(setShowDropdownLog)}
                        onMouseLeave={() => handleMouseLeave(setShowDropdownLog)}>
                        <a className="web-nav-link web-nav-link-custom" href="#"><IoPersonCircleOutline size={32} /></a>
                        {showDropdownLog && (
                            <div className="web-dropdown1-menu">
                                {sessionStorage.getItem("visitor_id") ?
                                    <>
                                    <a className="web-dropdown1-item" href="#" onClick={onClickLogout}>로그아웃</a>
                                    <a className="web-dropdown1-item" href="/web/visitor/mypage">마이페이지</a>
                                    </>
                                    :                                
                                    <a className="web-dropdown1-item" href="/web/visitor/login">로그인</a>
                            }
                            </div>
                        )}
                    </div>

                    <div className='me-5'>

                    </div>

                </Nav>
            </div>

        </div>

    );
}

export default Web_Menu;
