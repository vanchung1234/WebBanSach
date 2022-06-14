import React, { useState, useEffect } from 'react'
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { getDataAPI } from '../../utils/fetchData';
import { useSelector } from 'react-redux';

const FeaturedInfo = () => {
    const { order } = useSelector(state => state)
    const [income, setIncome] = useState([]);
    const [perc, setPerc] = useState(0);

    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await getDataAPI("income");
                setIncome(res.data);
                setPerc((res.data[1].total * 100) / res.data[0].total - 100);
            } catch { }
        };
        getIncome();
    }, []);

    return (
        <div className='feartureInfo'>
            <div className="featuredItem col-lg-5 col-sm-5 col-xs-12">
                <span className="featuredTitle">Total Revanue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{order.totalAmount}$</span>

                </div>
                <span className="featuredSub">Compared all</span>
            </div>
            <div className="featuredItem col-lg-5 col-sm-5 col-xs-12 ">
                <span className="featuredTitle">Revanue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{income[1]?.total}$</span>
                    <span className="featuredMoneyRate">
                        %{Math.floor(perc)}{" "}
                        {perc < 0 ? (
                            <ArrowDownward className="featuredIcon negative" />
                        ) : (
                            <ArrowUpward className="featuredIcon" />
                        )}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>

        </div>
    )
}

export default FeaturedInfo