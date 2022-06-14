
import { deleteUser } from '../../redux/action/userAction'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from '../../component/admin/Sidebar';
import { Link } from 'react-router-dom';
const UserList = () => {
    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const columns = [
        { field: '_id', headerName: 'ID', width: 250, flex: 0.8 },
        { field: 'username', headerName: 'Name', width: 150, flex: 0.5 },

        {
            field: "user",
            headerName: "Avatar",
            width: 200,
            renderCell: (params) => {

                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.avatar} alt="" />

                    </div>
                );
            },
        },
        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.row.role === "admin"
                    ? "greenColor"
                    : "redColor";
            },
        },

        {
            field: "action",
            headerName: "Action",
            width: 150,
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const user = params.row
                return (
                    <>
                        <Link to='/dashboard/users/update' state={user} > <button className="productListEdit"  >Edit</button></Link>


                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => dispatch(deleteUser({ user, auth }))}
                        />
                    </>
                );
            },
        },
    ];

    const rows = []

    profile.users.map((item) => (
        rows.push(item)
    ))

    return (

        <div className='row' style={{ width: '100%', margin: '0px 0px', padding: '0' }}>
            <div className="sidebar col-lg-3 col-sm-3">
                <Sidebar />
            </div>
            <div className=" col-lg-9 col-sm-9" style={{ height: '90vh' }}>
                <div className='heading-db-p'>

                    <span style={{ textAlign: 'center', fontSize: '40px' }} >User</span>
                </div>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    checkboxSelection
                    getRowId={(row) => row._id}
                />
            </div>
        </div>

    );
}

export default UserList