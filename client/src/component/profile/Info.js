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
                            <h1>Hồ sơ của tôi</h1>
                            <img src={user.avatar} alt={user.name} className="mb-3" />
                            <button
                                className="btn "
                                onClick={() => setOnEdit(true)}
                                style={{ backgroundColor: 'red' }}
                            >
                                Thay đổi thông tin hồ sơ
                            </button>
                        </div>
                        <div>
                            <div>
                                <h4>Tên đăng nhập</h4>
                                <p>{user.username}</p>
                            </div>

                            <div>
                                <h4>Tham gia vào</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>

                            <div>
                                <Link to="/Myorder">Đơn hàng của tôi</Link>
                                <Link to="/updatePassword">Thay đổi mật khẩu</Link>
                            </div>
                        </div>

                    </>
                ))}
            </div>
        </Fragment>

    )
}

export default Info