import React, { useState, useEffect, useMemo } from 'react'
import { getDataAPI } from '../../utils/fetchData';
import Chart from './Chart';

const StatsOrder = () => {
    const [orderStats, setOrderStats] = useState([]);
    const MONTHS = useMemo(
        () => [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ],
        []
    );

    useEffect(() => {
        const getOrderStats = async () => {
            try {
                const res = await getDataAPI("stats/order");
                res.data.map((item) =>
                    setOrderStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], "Lợi nhuận": item.total },
                    ])
                );
            } catch { }
        };
        getOrderStats();
    }, [MONTHS]);
    return (

        <Chart
            data={orderStats}
            title="Phân tích hóa đơn"
            grid
            dataKey="Lợi nhuận"
        />
    )
}

export default StatsOrder