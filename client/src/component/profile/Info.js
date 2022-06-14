import React, { useState, useEffect, Fragment } from 'react'
import { GLOBALTYPES } from '../../redux/action/globalType';
import { Link } from "react-router-dom";

const Info = ({ id, auth, profile, dispatch }) => {
    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false);


    useEffect(() => {
        if (id === auth.user._id) {
            setUserData([auth.user]);
        } else {
            const newData = profile.users.filter((user) => user._id === id);
            setUserData(newData);
        }
    }, [id, auth, dispatch, profile.users]);

    useEffect(() => {
        if (onEdit) {
            dispatch({ type: GLOBALTYPES.MODAL, payload: true });
        } else {
            dispatch({ type: GLOBALTYPES.MODAL, payload: false });
        }
    }, [onEdit, dispatch]);

    return (

        <Fragment>
            <div className="profileContainer">
                {userData.map((user) => (
                    <>
                        <div key={user._id}>
                            <h1>My Profile</h1>
                            <img src={user.avatar} alt={user.name} className="mb-3" />
                            <button
                                className="btn "
                                onClick={() => setOnEdit(true)}
                                style={{ backgroundColor: 'red' }}
                            >
                                Edit Profile
                            </button>
                        </div>
                        <div>
                            <div>
                                <h4>User Name</h4>
                                <p>{user.username}</p>
                            </div>

                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>

                            <div>
                                <Link to="/Myorder">My Orders</Link>
                                <Link to="/updatePassword">Change Password</Link>
                            </div>
                        </div>

                    </>
                ))}
            </div>
        </Fragment>

    )
}

export default Info