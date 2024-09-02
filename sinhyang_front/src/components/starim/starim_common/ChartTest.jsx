import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";

const ChartTest = () => {

    const [data, setData] = useState('');
    
    const callAPI = async () => {
        const res = await axios.get("/erp/purchase/view")
        console.log(res.data)
        let array=[];
        array.push(['국내', '수량']);
        res.data.forEach(purchase=>{
          const total = purchase.purchase_qnt * purchase.purchase_price
        array.push([`${purchase.purchase_items_id}`, total])
        });
        setData(array);
    }
    
    useEffect(()=>{
        callAPI();
    },[])



    const options = {
        title: "입고비율",
      };


  return (
    <Chart
    chartType="PieChart"
    data={data}
    options={options}
    width={"100%"}
    height={"400px"}
    />
  )
}

export default ChartTest