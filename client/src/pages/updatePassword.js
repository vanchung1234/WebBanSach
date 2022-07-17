import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { updatePassword } from "../redux/action/userAction";
import { GLOBALTYPES } from "../redux/action/globalType";
const UpdatePassword = () => {
    const dispatch = useDispatch();
    const initialState = { oldPassword: "", password: "", cfpassword: "" }
    const [userData, setUserData] = useState(initialState)
    const { auth } = useSelector((state) => state);
    const { oldPassword, password, cfpassword } = userData


    const handleInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePassword(userData, auth));
    };

    return (
        <Fragment>
            {/* {loading ? ( */}
            {/* <Loader /> */}
            {/* ) : ( */}
            <Fragment>
                <div className="updatePasswordContainer">
                    <div className="updatePasswordBox">
                        <div className="d-flex"><h2 className="updateProfileHeading">Thay đổi mật khẩu</h2>
                        </div>

                        <form
                            className="updatePasswordForm"
                            onSubmit={updatePasswordSubmit}
                        >
                            <div className="loginPassword">
                                <VpnKeyIcon />
                                <input
                                    type="password"
                                    placeholder="Mật khẩu cũ"
                                    name="oldPassword"
                                    required
                                    value={oldPassword}
                                    onChange={handleInput}
                                />
                            </div>

                            <div className="loginPassword">
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="Mật khẩu mới"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="loginPassword">
                                <LockIcon />
                                <input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    required
                                    name="cfpassword"
                                    value={cfpassword}
                                    onChange={handleInput}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Thay đổi"
                                className="updatePasswordBtn"
                            />
                        </form>
                    </div>
                </div>
            </Fragment>
            {/* )} */}
        </Fragment>
    );
}

export default UpdatePassword
