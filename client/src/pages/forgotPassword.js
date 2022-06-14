import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face"
import { Link } from "react-router-dom"
import { forgotPassword } from "../redux/action/userAction";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { alert } = useSelector(state => state)
    const initialState = { username: "", protectedCode: "", password: "" }
    const [userData, setUserData] = useState(initialState)

    const { username, password, protectedCode } = userData

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(userData));
    };

    return (
        <Fragment>

            <Fragment>
                <div className="forgotPasswordContainer">
                    <div className="LoginSignUpBox">
                        <h2 className="forgotPasswordHeading">Forgot Password</h2>

                        <form
                            className="forgotPasswordForm mb-4 py-1"
                            onSubmit={forgotPasswordSubmit}
                        >
                            <div className="forgotPasswordEmail mb-1 py-1">
                                <FaceIcon />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }}
                                    name="username"
                                    value={username}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <small className="form-text text-danger mb-2">
                                {alert.username ? alert.username : ""}
                            </small>

                            <div className="forgotPasswordEmail mb-1 py-1">
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="Protected Code"
                                    style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }}

                                    name="protectedCode"
                                    value={protectedCode}
                                    onChange={handleChangeInput}

                                />
                            </div>
                            <small className="form-text text-danger mb-1">
                                {alert.protectedCode ? alert.protectedCode : ""}
                            </small>
                            <div className="forgotPasswordEmail mb-1 py-1">
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="NewPassword"
                                    style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }}
                                    name="password"
                                    value={password}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <small className="form-text text-danger mb-1">
                                {alert.password ? alert.password : ""}
                            </small>
                            <input
                                type="submit"
                                value="Send"
                                className="forgotPasswordBtn"
                            />

                            <Link to="/login">Login?</Link>

                        </form>
                    </div>
                </div>
            </Fragment>

        </Fragment>
    );
}

export default ForgotPassword