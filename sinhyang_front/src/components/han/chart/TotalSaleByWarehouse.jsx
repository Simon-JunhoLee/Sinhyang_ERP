import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const TotalSaleByWarehouse = () => {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const location = {
    '동부물류센터':'국내',
    '파주물류센터':'해외'
  };

    const callAPI = async() => {
        try{const res = await axios.get('/erp/chart/totalSaleByWarehouse')
        //console.log(res.data);
        setList(res.data);
        const apiData = res.data;
        
        const chartData = [["판매처", "판매금액"]];
        const salesData = [];
        apiData.forEach(item=>{
          const displayName = location[item.warehouse_name];
          chartData.push([displayName, item.totalSale]);
        });
        setData(chartData);
      }catch(error){
        console.log('국내/해외 판매비율 차트', error)
      }
    }

    useEffect(()=>{
        callAPI();
    },[])

    const formatCurrency = (amount) => {
      return amount.toLocaleString();
  }

  return (
    <div>
      {data.length > 1 ? (
        <>
        <Chart
          chartType='PieChart'
          width='100%'
          height='400px'
          data={data}
          options={{
            title : '국내/해외 판매액 비율',
            pieSliceText : 'label_and_value',
            pieHole : 0.4,
          }}
        />
        <div className='text-center'>
          {list.map((item, index)=>{
            const displayName = location[item.warehouse_name];
            return(
            <p key={index}>
              {displayName} : {formatCurrency(item.totalSale)}원
            </p>
            );
          })}
        </div>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  )
}

export default TotalSaleByWarehouse