import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ERP_HomePage from '../erp_common/ERP_HomePage'
import '../common/assets/erp/css/styles.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../common/assets/erp/css/Slick.css'
import ERP_SideMenu from '../erp_common/ERP_SideMenu';
import ERP_TopMenu from '../erp_common/ERP_TopMenu';
import SalesRouter from './starim/SalesRouter';
import ItemsRouter from './starim/ItemsRouter';
import WareHouseRouter from './starim/WareHouseRouter';
import ClientRouter from './starim/ClientRouter';
import MessageRouter from './bj/MessageRouter';
import AttendanceRouter from './jun/AttendanceRouter';
import MemberRouter from './jun/MemberRouter';
import PurchaseRouter from './starim/PurchaseRouter';
import VendorRouter from './starim/VendorRouter';
import NoticeRouter from './starim/NoticeRouter';
import InventoryRouter from './han/InventoryRouter';
import EmployBBSRouter from './bj/EmployBBSRouter';
import AccountRouter from './jun/AccountRouter';
import TransactionRouter from './jun/TransactionRouter';
import ERP_FAQRouterPage from './jay/ERP_FAQRouterPage';




const ERP_RouterPage = () => {


    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">

            <ERP_SideMenu />
            <div className="body-wrapper">
                <ERP_TopMenu />
                <div className="container-fluid">
                    <Routes>
                        <Route path='' element={<ERP_HomePage />} />
                        <Route path='member/*' element={<MemberRouter />} />
                        <Route path='attendance/*' element={<AttendanceRouter />} />
                        <Route path='account/*' element={<AccountRouter />} />
                        <Route path='transaction/*' element={<TransactionRouter />} />
                        <Route path='/sales/*' element={<SalesRouter/>}/>
                        <Route path='/items/*' element={<ItemsRouter/>}/>
                        <Route path='/client/*' element={<ClientRouter/>}/>
                        <Route path='/warehouse/*' element={<WareHouseRouter/>}/>
                        <Route path='/message/*' element={<MessageRouter/>}/>
                        <Route path='/purchase/*' element={<PurchaseRouter/>}/>
                        <Route path='/vendor/*' element={<VendorRouter/>}/>
                        <Route path='/notice/*' element={<NoticeRouter/>}/>
                        <Route path='/inventory/*' element={<InventoryRouter/>}/>
                        <Route path='/employ/*' element={<EmployBBSRouter/>}/>
                        <Route path='/faq/*' element={<ERP_FAQRouterPage/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default ERP_RouterPage