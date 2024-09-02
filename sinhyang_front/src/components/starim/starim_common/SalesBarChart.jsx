import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
import axios from 'axios';

const SalesBarChart = () => {

    const [data, setData] = useState([['판매처', '품목1', '품목2', '품목3']]); // 초기값 설정
    const [key] = useState('sales_employee');
    const [word] = useState(sessionStorage.getItem('member_info_id'));
    
    
    
    const callAPI = async () => {
          const res = await axios.get(`/erp/sales/view?key=${key}&word=${word}`);
          return res.data; // API에서 반환된 데이터
      };
    
    useEffect(()=>{
        async function fetchData() {
          const rawData = await callAPI(); // callAPI 함수를 통해 데이터 가져오기

          if (!rawData || rawData.length === 0) {
            setData([['판매처', '품목1', '품목2', '품목3']]); // 데이터가 없으면 빈 데이터로 설정
            return;
        }
    
          // 데이터 변환: 판매처별 품목의 총 판매량 집계
            const aggregatedData = rawData.reduce((acc, item) => {
                const { sales_location, sales_items_id, sales_qnt } = item;
                if (!acc[sales_location]) {
                    acc[sales_location] = {};
                }
                if (!acc[sales_location][sales_items_id]) {
                    acc[sales_location][sales_items_id] = 0;
                }
                acc[sales_location][sales_items_id] += sales_qnt;
                return acc;
            }, {});
    
           // 품목 목록 추출
            const itemsSet = new Set();
            Object.values(aggregatedData).forEach(items => {
                Object.keys(items).forEach(item => itemsSet.add(item));
            });

            const itemsList = Array.from(itemsSet);

            // 차트에 사용할 데이터 형식으로 변환
            const chartData = [['판매처', ...itemsList]];

            Object.entries(aggregatedData).forEach(([location, items]) => {
                const row = [location];
                itemsList.forEach(item => {
                row.push(items[item] || 0);
                });
                chartData.push(row);
            });

            setData(chartData);
        }
    
        fetchData();
      }, [key, word]); // key와 word가 변경될 때마다 데이터 새로 불러오기



    const options = {
        title: '판매처별 품목 판매량',
        chartArea: { width: '50%' },
        hAxis: {
          title: '판매량',
          minValue: 0,
        },
        vAxis: {
          title: '판매처',
        },
        tooltip: {
          trigger: 'selection',
          textStyle: { color: 'black' },
          showColorCode: true,
        },
      };

          // 데이터가 빈 배열일 때 차트를 렌더링하지 않음
    if (data.length <= 1) {
        return null;
    }


  return (
    <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
    />
  )
}

export default SalesBarChart