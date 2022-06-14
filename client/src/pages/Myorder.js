import React from 'react'
import { useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import Moment from 'react-moment';
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
const Myorders = () => {
    const { myOrder } = useSelector(state => state)

    const columns = [
        { field: '_id', headerName: 'ID', width: 180 },
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
            minWidth: 178,
            renderCell: (params) => {
                const info = params.row
                return (
                    <>
                        <Moment>{info.createdAt}</Moment>
                    </>
                )

            }
        },
        {
            field: "orderStatus",
            headerName: "Status",
            type: "number",
            minWidth: 100,

            cellClassName: (params) => {
                return params.row.orderStatus === "Done"
                    ? "greenColor"
                    : "redColor";
            },
        },

    ];

    const rows = []

    myOrder.orders.map((item) => (
        rows.push(item)
    ))

    return (


        <div style={{ height: '100vh' }}>
            <div className='heading-db-p'>

                <span style={{ textAlign: 'center', fontSize: '40px' }} >My Order</span>

            </div>

            {
                myOrder.orders.length === 0 ? (
                    <div className="emptyCart" style={{ height: '0px' }}>
                        <RemoveShoppingCartIcon />

                        <Typography>No Order </Typography>
                        <Link to="/products">View Products</Link>
                    </div>
                ) : (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        checkboxSelection
                        getRowId={(row) => row._id}

                    />
                )
            }


        </div>



    );

}

export default Myorders