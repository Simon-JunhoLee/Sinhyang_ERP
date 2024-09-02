import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WEB_ItmesReadPage from '../../components/bj/web_items/WEB_ItmesReadPage'
import WEB_DrinksItemsPage from '../../components/bj/web_items/WEB_DrinksItemsPage'
import WEB_NoodleItemsPage from '../../components/bj/web_items/WEB_NoodleItemsPage'
import WEB_SnackItemsPage from '../../components/bj/web_items/WEB_SnackItemsPage'
import WEB_EfoodItemsPage from '../../components/bj/web_items/WEB_EfoodItemsPage'


const ItemsRouter = () => {
  return (
    <>
    <WEB_ItmesReadPage/>
    <Routes>
        <Route path='/read' element={<WEB_DrinksItemsPage/>}/>
        <Route path='/noodle' element={<WEB_NoodleItemsPage/>}/>
        <Route path='/snack' element={<WEB_SnackItemsPage/>}/>
        <Route path='/efood' element={<WEB_EfoodItemsPage/>}/>
    </Routes>

    </>
  )
}

export default ItemsRouter