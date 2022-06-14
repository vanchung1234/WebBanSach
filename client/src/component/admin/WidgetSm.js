import React, { useState } from 'react'
import { Visibility } from "@material-ui/icons";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Button } from "@material-ui/core";

const WidgetSm = () => {
    const { users } = useSelector(state => state.profile)
    return (
        <div className="widgetSm">
            <div style={{ display: "flex", justifyContent: 'space-around' }}>
                <h3 className="widgetLgTitle">New member</h3>
                <Link to='/dashboard/users'>
                    <Button
                        id="createProductBtn"


                    >
                        Show all
                    </Button>
                </Link>
            </div>

            <ul className="widgetSmList">
                {
                    users.slice(0, 4).map(user => (
                        <li className="widgetSmListItem" key={user._id}>
                            <img
                                src={user.avatar}
                                alt=""
                                className="widgetSmImg"
                            />
                            <div className="widgetSmUser">
                                <span className="widgetSmUsername">{user.username}</span>
                                <span className="widgetSmUserTitle">{user.role}</span>
                            </div>

                        </li>
                    ))
                }




            </ul>
        </div>
    );
}

export default WidgetSm