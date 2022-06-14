import React, { Fragment, useEffect, useState } from "react";
import FaceIcon from "@material-ui/icons/Face";

import Sidebar from "../../component/admin/Sidebar";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/action/userAction";

const UpdateUser = () => {
    const roles = [
        "admin",
        "user",
    ];

    const dispatch = useDispatch()
    const location = useLocation()
    const user = location.state
    console.log(user)
    const [role, setRole] = useState(user.role);

    const test = user.role

    const updateSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(role, user));
    };
    return (
        <Fragment>
            <div className='row' style={{ width: '100%', margin: '0px 0px', padding: '0' }}>
                <Sidebar />
                <div className=" col-lg-9 col-sm-9" style={{ height: '90vh', display: 'flex', justifyContent: 'center' }}>
                    <div className="updateProfileBox">
                        <div className="d-flex"><h2 className="updateProfileHeading">Update User</h2>
                        </div>

                        <form
                            className="updateProfileForm"
                            onSubmit={updateSubmit}
                            style={{ border: '1px solid #f0f0f0' }}
                        >
                            <div className="updateProfileName">
                                <span className='label'>UserId:</span>
                                <input
                                    type="text"
                                    placeholder="Id"
                                    disabled
                                    name="username"
                                    value={user._id}
                                />
                            </div>

                            <div className="updateProfileName">
                                <span className='label'>Username:</span>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    disabled
                                    name="username"
                                    value={user.username}
                                />
                            </div>
                            <div id="updateProfileImage">
                                <span className='label'>Avatar:</span>
                                <img src={user.avatar} />

                            </div>
                            <div className="updateProfileName">

                                <select className='optionupdate' value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="" >{user.role}</option>
                                    {
                                        roles.filter((item) => item !== test).map((role) => {
                                            return (
                                                <option
                                                    value={role}
                                                    key={role}
                                                >
                                                    {role}
                                                </option>
                                            );
                                        })
                                    }

                                </select>
                            </div>
                            <input
                                type="submit"
                                value="Update"
                                className="updateProfileBtn"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>)
}

export default UpdateUser