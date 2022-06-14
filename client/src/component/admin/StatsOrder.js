import React, { useState, useEffect, useMemo } from 'react'
import { getDataAPI } from '../../utils/fetchData';
import Chart from './Chart';

const StatsOrder = () => {
    const [orderStats, setOrderStats] = useState([]);
    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
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
                        { name: MONTHS[item._id - 1], "Benefit": item.total },
                    ])
                );
            } catch { }
        };
        getOrderStats();
    }, [MONTHS]);
    return (

        <Chart
            data={orderStats}
            title="Order Analytics"
            grid
            dataKey="Benefit"
        />
    )
}

export default StatsOrder