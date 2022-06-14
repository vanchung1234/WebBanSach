import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors } from '../../redux/action/globalType'
const Alert = () => {
    const notify = useAlert()
    const { alert } = useSelector(state => state)
    // const dispatch = useDispatch()
    useEffect(() => {
        if (alert.error) {
            notify.error(alert.error);
            // dispatch(clearErrors())
        }
        if (alert.success) {
            notify.success(alert.success);
            // dispatch(clearErrors())

        }

    }, [notify, alert.error, alert.success]);
    return (
        <> </>
    )
}

export default Alert