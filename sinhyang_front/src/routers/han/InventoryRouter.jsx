import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InventoryPage from '../../components/han/inventory/InventoryPage'
import TradeListPage from '../../components/han/inventory/TradeListPage'
import WarehouseListPage from '../../components/han/inventory/WarehouseListPage'
import TotalSaleByWarehouse from '../../components/han/chart/TotalSaleByWarehouse'
import SaleByCountry from '../../components/han/chart/SaleByCountry'

const InventoryRouter = () => {
  return (
    <Routes>
        <Route path='itemlist' element={<InventoryPage/>}/>
        <Route path='tradelist' element={<TradeListPage/>}/>
        <Route path='warehouselist' element={<WarehouseListPage/>}/>
        <Route path='totalsalebywarehousechart' element={<TotalSaleByWarehouse/>}/>
        <Route path='salebycountry' element={<SaleByCountry/>}/>
    </Routes>
  )
}

export default InventoryRouter