import React, { Fragment, useState, useEffect } from "react";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { checkImage } from "../utils/imageUpload";
import { updateProfileUser } from "../redux/action/userAction";
import { GLOBALTYPES } from "../redux/action/globalType";
const UpdateModal = () => {
    const initState = {
        username: ''
    }
    const [userData, setUserData] = useState(initState)
    const { username } = userData

    const [avatar, setAvatar] = useState('')

    const { auth, modal } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData(auth.user)
    }, [auth.user])


    const changeAvatar = (e) => {
        const file = e.target.files[0]

        const err = checkImage(file)
        if (err) return dispatch({
            type: GLOBALTYPES.ALERT, payload: { error: err }
        })

        setAvatar(file)
    }

    const handleInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(updateProfileUser({ userData, avatar, auth }))
    }

    const styleModal = {
        zIndex: modal ? 100 : 0
    }

    return (
        <Fragment>
            <div className="updateProfileContainer" style={styleModal}>
                <div className="updateProfileBox">
                    <div className="d-flex"><h2 className="updateProfileHeading">Update Profile</h2>
                        <span className="close" onClick={() => dispatch({
                            type: GLOBALTYPES.MODAL, payload: false
                        })}>
                            &times;
                        </span></div>

                    <form
                        className="updateProfileForm"
                        onSubmit={handleSubmit}
                    >
                        <div className="updateProfileName">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="Username"
                                required
                                name="username"
                                value={username}
                                onChange={handleInput}
                            />
                        </div>


                        <div id="updateProfileImage">
                            <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} />
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={changeAvatar}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Update"
                            className="updateProfileBtn"
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default UpdateModal