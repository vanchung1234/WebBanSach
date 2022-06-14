import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProduct } from '../../redux/action/productAction';
import { DeleteOutline } from "@material-ui/icons";
import Sidebar from '../../component/admin/Sidebar';
import { GLOBALTYPES } from '../../redux/action/globalType';

const ProductList = () => {
    const { allProduct, auth } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProduct())
    }, [dispatch])

    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Name', width: 200 },

        {
            field: "product",
            headerName: "Images",
            width: 100,
            renderCell: (params) => {

                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.images[0].url} alt="" />

                    </div>
                );
            },
        }, ,
        { field: 'description', headerName: 'Desc', width: 130 },

        { field: "stock", headerName: "Stock", width: 100 },
        {
            field: "price",
            headerName: "Price",
            width: 160,
        },
        {
            field: "category",
            headerName: "Category",
            width: 130,
        },
        {
            field: "action",
            headerName: "Action",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const product = params.row
                return (
                    <>

                        <button className="productListEdit" onClick={() => dispatch({ type: GLOBALTYPES.PRODUCT_MODAL, payload: { ...product, onEdit: true } })} >Edit</button>

                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => dispatch(deleteProduct({ product, auth }))}
                        />
                    </>
                );
            },
        },
    ];

    const rows = []

    allProduct.products.map((item) => (
        rows.push(item)
    ))

    return (

        <div className='row' style={{ width: '100%', margin: '0px 0px', padding: '0' }}>
            <div className="sidebar col-lg-3 col-sm-3">
                <Sidebar />
            </div>
            <div className=" col-lg-9 col-sm-9" style={{ height: '90vh' }}>
                <div className='heading-db-p'>

                    <span style={{ textAlign: 'center', fontSize: '40px' }} >Products</span>
                    <span className='py-2' style={{ fontSize: '20px' }} onClick={() => dispatch({
                        type: GLOBALTYPES.PRODUCT_MODAL, payload: true
                    })}>Create Product</span>
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



export default ProductList