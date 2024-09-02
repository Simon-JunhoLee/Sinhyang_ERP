import React from 'react'
import ERP_Transaction_Sales from './ERP_Transaction_Sales'
import ERP_Transaction_Purchase from './ERP_Transaction_Purchase'

const ERP_Transaction_PayList = () => {
    return (
        <div className='px-3'>
            <div className='mb-5'>
                <h2>대금지불</h2>
            </div>
            <div className='mb-5 px-5'>
                <ERP_Transaction_Sales />
            </div>
            <div className='px-5'>
                <ERP_Transaction_Purchase />
            </div>
        </div>
    )
}

export default ERP_Transaction_PayList