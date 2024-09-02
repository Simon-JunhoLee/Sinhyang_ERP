import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts';

const SaleByCountry = () => {
    const [chartData, setChartData] = useState([]);
    const locationMap = {
        13: 'South Korea',
        19: 'India'
    };
    const callAPI = async () => {
        try {
            const res = await axios.get('/erp/chart/saleByCountry');
            console.log(res.data)
            const transformedData = await res.data.map((item) => [
                locationMap[item.location],
                item.sale
            ]);
            setChartData([['Country', 'Sales'], ...transformedData]);
        } catch (error) {
            console.log('국가별 판매 차트', error);
        }
    }

    useEffect(() => {
        callAPI();
    }, [])

    return (
        <div>
            <Chart
                width='100%'
                hegith='100%'
                chartType="GeoChart"
                data={chartData}
                options={{
                    colorAxis: { colors: ['#e5f5f9', '#91c8f0'] },
                    backgroundColor: '#fff',
                    datalessRegionColor: '#f5f5f5',
                    defaultColor: '#f5f5f5'
                }}
            />
        </div>
    )
}

export default SaleByCountry