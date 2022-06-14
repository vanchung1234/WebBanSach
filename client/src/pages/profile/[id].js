import React, { useEffect } from 'react'
import Info from '../../component/profile/Info'
import { getUser } from '../../redux/action/userAction'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
const Profile = () => {
    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const { id } = useParams()

    useEffect(() => {
        dispatch(getUser({ id, auth }))

    }, [id, auth, dispatch])

    return (
        <>
            <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
        </>
    )
}

export default Profile