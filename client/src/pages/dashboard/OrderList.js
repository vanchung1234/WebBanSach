import { DataGrid } from '@mui/x-data-grid';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../component/admin/Sidebar';
import { deleteOrder } from '../../redux/action/orderAction'
import { DeleteOutline } from "@material-ui/icons";
import { Link } from 'react-router-dom';

const OrderList = () => {
    const { order, auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const columns = [
        { field: '_id', headerName: 'ID', width: 140 },
        {
            field: "orderItem",
            headerName: "orderItem",
            minWidth: 350,
            renderCell: (params) => {
                const orderItem = params.row.orderItems
                return (
                    <div className='table-order'>
                        {
                            orderItem.map((item) => (
                                <div className="productListItem">
                                    <img className="productListImg mx-1" src={item.image} alt="" />
                                    <span className='mr-3'>{item.name} </span>
                                    <span className='mx-3'>Price: {item.price}</span>
                                    <span className='mx-3'>Quantity: {item.quantity}</span>
                                </div>
                            ))
                        }
                    </div>
                );
            },
        },

        { field: 'itemsPrice', headerName: 'itemsPrice', width: 130 },
        { field: 'shippingPrice', headerName: 'shippingPrice', width: 130 },
        { field: 'totalPrice', headerName: 'totalPrice', width: 130 },


        {
            field: "user",
            headerName: "User",
            minWidth: 330,
            renderCell: (params) => {
                const info = params.row.user
                return (
                    <div className="productListItem">
                        <span className=''>Id: {info._id} </span>
                        <span className='ml-2'>Name: {info.username}</span>
                    </div>
                )

            }
        },
        {
            field: "shippingInfo",
            headerName: "Address",
            minWidth: 140,
            renderCell: (params) => {
                const info = params.row.shippingInfo
                return (
                    <>
                        <span>{info.address},{info.city},{info.country}</span>
                    </>
                )

            }
        },
        {
            field: "phone",
            headerName: "Phone",
            minWidth: 100,
            renderCell: (params) => {
                const info = params.row.shippingInfo
                return (
                    <>
                        <span>{info.phone}</span>
                    </>
                )

            }
        },
        {
            field: "payment",
            headerName: "Payment",
            minWidth: 140,
            renderCell: (params) => {
                const info = params.row.shippingInfo
                return (
                    <>
                        <span>{info.payment}</span>
                    </>
                )

            }
        },
        {
            field: "createAt",
            headerName: "CreateAt",
            minWidth: 100,
            renderCell: (params) => {
                const info = params.row
                return (
                    <>
                        <span>{String(info.createdAt).substr(0, 10)}</span>
                    </>
                )

            }
        },
        {
            field: "orderStatus",
            headerName: "Status",
            type: "number",
            minWidth: 140,
            flex: 0.3,
            cellClassName: (params) => {
                return params.row.orderStatus === "Done"
                    ? "greenColor"
                    : "redColor";
            },
        },

        {
            field: "action",
            headerName: "Action",
            minWidth: 100,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const id = params.row._id
                const order = params.row
                return (
                    <>
                        <Link to={`/order/${id}`}>
                            <button className="productListEdit"  >Edit</button>

                        </Link>

                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => dispatch(deleteOrder({ order, auth }))}

                        />
                    </>
                );
            },
        },
    ];

    const rows = []

    order.orders.map((item) => (
        rows.push(item)
    ))

    return (

        <div className='row' style={{ width: '100%', margin: '0px 0px', padding: '0' }}>
            <div className="sidebar col-lg-2 col-sm-2">
                <Sidebar />
            </div>
            <div className=" col-lg-10 col-sm-10" style={{ height: '90vh' }}>
                <div className='heading-db-p'>

                    <span style={{ textAlign: 'center', fontSize: '40px' }} >Order</span>

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

export default OrderList