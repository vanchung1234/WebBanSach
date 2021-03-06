import React, { Fragment, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face"
import { login, register } from "../redux/action/authAction";
import logo from "../images/logo.png";

const Login = () => {
    const dispatch = useDispatch()
    const { alert, auth } = useSelector((state) => state)
    const initialState = { username: "", password: "", cfpassword: "", protectedCode: "" }

    const [userData, setUserData] = useState(initialState)
    const { username, password, cfpassword, protectedCode } = userData

    const [loginUsername, setLoginUsername] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginUsername, loginPassword));
    };



    const registerDataChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const registerSubmit = (e) => {
        e.preventDefault();
        dispatch(register(userData));
    };

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.token) navigate("/");
    }, [auth.token, navigate]);

    return (

        <Fragment>
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div className="mb-3">
                        <div className="login_signUp_toggle">
                            <p onClick={(e) => switchTabs(e, "login")}>????NG NH???P</p>
                            <p onClick={(e) => switchTabs(e, "register")}>????NG K??</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="T??n ????ng nh???p"
                                required
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="M???t kh???u"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}

                            />
                        </div>
                        <Link to="/password/forgot">Qu??n m???t kh???u ?</Link>
                        <input type="submit" value="????ng nh???p" className="loginBtn" />
                    </form>
                    <form
                        className="signUpForm"
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >

                        <div className="signUpName">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="T??n ????ng nh???p"
                                name="username"
                                value={username}
                                onChange={registerDataChange}
                                style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }}
                            />

                        </div>
                        <small className="form-text text-danger mb-2">
                            {alert.username ? alert.username : ""}
                        </small>
                        <div className="signUpPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="M???t kh???u"

                                name="password"
                                value={password}
                                onChange={registerDataChange}
                                style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}

                            />

                        </div>
                        <small className="form-text text-danger mb-2">

                            {alert.password ? alert.password : ""}
                        </small>
                        <div className="signUpPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="Nh???p l???i m???t kh???u"

                                name="cfpassword"
                                value={cfpassword}
                                onChange={registerDataChange}
                                style={{ background: `${alert.cfpassword ? "#fd2d6a14" : ""}` }}

                            />

                        </div>
                        <small className="form-text text-danger mb-2">
                            {alert.cfpassword ? alert.cfpassword : ""}
                        </small>
                        <div className="signUpPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="M?? b???o v??? d??ng cho l??c b???n qu??n m???t kh???u"
                                name="protectedCode"
                                value={protectedCode}
                                onChange={registerDataChange}
                                style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}

                            />

                        </div>
                        <small className="form-text text-danger mb-2">
                            {alert.protectedCode ? alert.protectedCode : ""}
                        </small>
                        <input type="submit" value="????ng k??" className="signUpBtn" />
                    </form>
                </div>
            </div>
        </Fragment>

    );
}

export default Login