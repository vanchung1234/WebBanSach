import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux';
import Chart from '../component/admin/Chart';
import FeaturedInfo from '../component/admin/FeaturedInfo';
import Sidebar from '../component/admin/Sidebar';
import StatsOrder from '../component/admin/StatsOrder';
import WidgetLg from '../component/admin/WidgetLg';
import WidgetSm from '../component/admin/WidgetSm';
import { getAllOrder } from '../redux/action/orderAction';
import { getAllUser } from '../redux/action/userAction';
import { getDataAPI } from '../utils/fetchData';
const Dashboard = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUser())
    }, [dispatch])


    useEffect(() => {
        dispatch(getAllOrder())
    }, [dispatch])

    const [userStats, setUserStats] = useState([]);
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
        const getStats = async () => {
            try {
                const res = await getDataAPI("stats");
                res.data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], "Active User": item.total },
                    ])
                );
            } catch { }
        };
        getStats();
    }, [MONTHS]);



    return (
        <div className='row' style={{ width: '100%', margin: '0px 0px', padding: '0' }}>
            <Sidebar />
            <div className="home col-lg-9 col-sm-9">
                <FeaturedInfo />
                <Chart
                    data={userStats}
                    title="User Analytics"
                    grid
                    dataKey="Active User"
                />
                <StatsOrder />
                <div className="homeWidgets">
                    <WidgetSm />
                    <WidgetLg />
                </div>
            </div>
        </div>
    );
}

export default Dashboard