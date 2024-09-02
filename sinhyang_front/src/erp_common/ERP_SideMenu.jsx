import React, { useEffect, useState } from 'react'
import { TbMessageShare } from "react-icons/tb";
import { TbMessageCheck } from "react-icons/tb";
import { BsBoxSeam, BsBriefcase, BsBuildingAdd, BsCreditCard, BsCurrencyExchange, BsFillPersonPlusFill, BsMegaphone, BsPeople, BsPersonLinesFill, BsSend } from "react-icons/bs";
import { VscTrash } from "react-icons/vsc";
import { TbMessage } from "react-icons/tb";
import { useLocation } from 'react-router-dom';
import { LuWarehouse } from "react-icons/lu";

const ERP_SideMenu = () => {
    const session_member_info_auth = sessionStorage.getItem("member_info_auth");

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const onClickSide = (e) => {
        e.preventDefault();
        setIsMenuOpen(!isMenuOpen);
    };


      useEffect(()=>{
        if(location.pathname.includes('/message')){
            setIsMenuOpen(true);
        }
    }, [location.pathname]);

    return (
        <aside className="left-sidebar">
            <div>
                <div className="brand-logo d-flex align-items-center justify-content-between">
                    <a href="/erp" >
                        <img src='/images/logo/sinhyangback.png' style={{ width: "14rem" }} />
                    </a>
                    <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                        <i className="ti ti-x fs-8"></i>
                    </div>
                </div>

                <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                    <ul id="sidebarnav">
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">Home</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/notice/list" aria-expanded="false">
                                <span>
                                    <BsMegaphone size="1.4em" strokeWidth="0.5px" />
                                </span>
                                <span className="hide-menu">알립니다.</span>
                            </a>
                        </li>

                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/message" aria-expanded="false" onClick={onClickSide}>
                                <span>
                                    <TbMessage size={22} />
                                </span>
                                <span className="hide-menu">메신저</span>
                            </a>
                            {isMenuOpen && (
                                <ul className="submenu ms-5">
                                    <li className="submenu-item mb-1">
                                        <a className="submenu-link" href="/erp/message/receive" >
                                            <TbMessageCheck /> 받은 메신저
                                        </a>
                                    </li>
                                    <li className="submenu-item  mb-1">
                                        <a className="submenu-link" href="/erp/message/send" ><TbMessageShare /> 보낸 메신저</a>
                                    </li>
                                    <li className="submenu-item  mb-1">
                                        <a className="submenu-link" href="/erp/message/insert" ><BsSend /> 메신저 보내기</a>
                                    </li>
                                    <li className="submenu-item  ">
                                        <a className="submenu-link" href="/erp/message/delete" ><VscTrash /> 휴지통</a>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">인사관리</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/attendance/list" aria-expanded="false">
                                <span className='me-1'>
                                    <BsBriefcase size="1.3em" strokeWidth="0.7px" />
                                </span>
                                <span className="hide-menu">근태관리</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/member/list" aria-expanded="false">
                                <span>
                                    <BsPersonLinesFill size="1.5em" strokeWidth="0.3px" />
                                </span>
                                <span className="hide-menu">사원목록</span>
                            </a>
                        </li>
                        {session_member_info_auth === "관리자" &&
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="/erp/member/register" aria-expanded="false">
                                    <span>
                                        <BsFillPersonPlusFill size="1.5em" strokeWidth="0.3px" />
                                    </span>
                                    <span className="hide-menu">사원등록</span>
                                </a>
                            </li>
                        }
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">구매 | 발주 </span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/vendor/list" aria-expanded="false">
                                <span>
                                    <BsBuildingAdd size="1.5em" strokeWidth="0.1px" />
                                </span>
                                <span className="hide-menu">구매처관리</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/purchase/list" aria-expanded="false">
                                <span>
                                    <i className="ti ti-article"></i>
                                </span>
                                <span className="hide-menu">구매리스트</span>
                            </a>
                        </li>

                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">유지 | 보수</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/items/list" aria-expanded="false">
                                <span>
                                    <i className="ti ti-article"></i>
                                </span>
                                <span className="hide-menu">아이템 리스트</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/warehouse/list" aria-expanded="false">
                                <span className='me-1'>
                                    <LuWarehouse size="1.3em" strokeWidth="2px" />
                                </span>
                                <span className="hide-menu">창고 리스트</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/inventory/itemlist" aria-expanded="false">
                                <span className='me-1'>
                                    <BsBoxSeam size="1.3em" strokeWidth="0.5px" />
                                </span>
                                <span className="hide-menu">재고 리스트</span>
                            </a>
                        </li>


                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">영업 | 판매</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/client/list" aria-expanded="false">
                                <span>
                                    <BsPeople size="1.4em" strokeWidth="0.3px"/>
                                </span>
                                <span className="hide-menu">고객관리</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/sales/list" aria-expanded="false">
                                <span>
                                    <i className="ti ti-article"></i>
                                </span>
                                <span className="hide-menu">판매 리스트</span>
                            </a>
                        </li>
                        {session_member_info_auth === "관리자" &&
                            <>
                                <li className="nav-small-cap">
                                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                    <span className="hide-menu">회계</span>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href="/erp/account/list" aria-expanded="false">
                                        <span>
                                            <BsCurrencyExchange size="1.4em" strokeWidth="0.001px" />
                                        </span>
                                        <span className="hide-menu">자금현황</span>
                                    </a>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href="/erp/transaction/pay" aria-expanded="false">
                                        <span>
                                            <BsCreditCard size="1.4em" strokeWidth="0.5px" />
                                        </span>
                                        <span className="hide-menu">대금지불</span>
                                    </a>
                                </li>
                                <li className="sidebar-item">
                                    <a className="sidebar-link" href="/erp/transaction/salary" aria-expanded="false">
                                        <span>
                                            <i className="ti ti-file-description"></i>
                                        </span>
                                        <span className="hide-menu">급여관리</span>
                                    </a>
                                </li>
                            </>
                        }
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">EXTRA</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/employ" aria-expanded="false">
                                <span>
                                    <i className="ti ti-mood-happy"></i>
                                </span>
                                <span className="hide-menu">채용공고관리</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/web" aria-expanded="false">
                                <span>
                                    <i className="ti ti-aperture"></i>
                                </span>
                                <span className="hide-menu">신향F&B</span>
                            </a>
                        </li>
                    </ul>
                </nav>

            </div>

        </aside>


    )
}

export default ERP_SideMenu