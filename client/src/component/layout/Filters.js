import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { GLOBALTYPES } from '../../redux/action/globalType'
import { getProducts } from '../../redux/action/productAction'
import Products from '../Product/Products'
import Notfoundproducts from './Notfoundproducts'
import Pagination from './Pagination'

const Filters = () => {
    const { categorys } = useSelector(state => state)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [searchs, setSearch] = useState('')
    const [page, setPage] = useState(1)
    // const [products, setProducts] = useState([])
    // const [result, setResult] = useState(0)
    const [totalPages, setTotalPage] = useState(0)

    const { search } = useLocation()
    const dispatch = useDispatch()

    const { auth, allproducts } = useSelector(state => state)

    useEffect(() => {
        const page = new URLSearchParams(search).get('page') || 1;
        setPage(Number(page))
    }, [search])

    // useEffect(() => {
    //     const getProducts = async () => {
    //         const res = await getDataAPI(`products?page=${page}&${category}&${sort}&name[regex]=${searchs}`)
    //         console.log(res)
    //         setProducts(res.data.products)
    //         setResult(res.data.result)
    //         const total = Math.ceil(res.data.count / 6)
    //         setTotalPage(total)

    //     }
    //     getProducts(products)
    // }, [category, sort, searchs, page, dispatch])

    useEffect(() => {

        dispatch(getProducts(page, category, sort, searchs))
        const total = Math.ceil(allproducts.count / 6)
        setTotalPage(total)

    }, [page, category, sort, searchs, dispatch, allproducts.count])

    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (

        <>
            <div id="mobile-filter">
                <div >
                    <h6 className="p-1 border-bottom">Category:</h6>

                    <form className="ml-md-2" value={category} onChange={handleCategory}>
                        <div className="form-inline border rounded p-sm-2 my-2">
                            <input type="radio" name='category' value='' />
                            <label htmlFor="boring" className="pl-1 pt-sm-0 pt-1">All products</label>
                        </div>
                        {
                            categorys.categories.map(category => (
                                <div className="form-inline border rounded p-sm-2 my-2" key={category._id}>
                                    <input type="radio" value={"category=" + category.name} key={category._id} name='category' />
                                    <label htmlFor="boring" className="pl-1 pt-sm-0 pt-1">{category.name}</label>
                                </div>
                            ))
                        }
                    </form>
                </div>
                <div>
                    <h6 className="p-1 border-bottom">Filter by:</h6>
                    <form className="ml-md-2" value={sort} onChange={e => setSort(e.target.value)}>
                        <div className="form-inline border rounded p-sm-2 my-2">
                            <input type="radio" name="type" value='' />
                            <label htmlFor="boring" className="pl-1 pt-sm-0 pt-1">Newest</label>
                        </div>
                        <div className="form-inline border rounded p-sm-2 my-2">
                            <input type="radio" name="type" value='sort=oldest' />
                            <label htmlFor="ugly" className="pl-1 pt-sm-0 pt-1">Oldest</label>
                        </div>
                        <div className="form-inline border rounded p-md-2 p-sm-1">
                            <input type="radio" name="type" value='sort=-price' />
                            <label htmlFor="notugly" className="pl-1 pt-sm-0 pt-1">Price: Hight-Low</label>
                        </div>
                        <div className="form-inline border rounded p-md-2 p-sm-1">
                            <input type="radio" name="type" value='sort=price' />
                            <label htmlFor="notugly" className="pl-1 pt-sm-0 pt-1">Price: Low-Hight</label>
                        </div>
                    </form>
                </div>

            </div>
            <section id="sidebar" name="category"  >
                <div >


                    <h6 className="p-3 border-bottom">Category:</h6>

                    <form className="ml-md-2 mb-4" value={category} onChange={handleCategory}>
                        <div className="form-inline border rounded p-sm-2 my-2">
                            <input type="radio" name='category' value='' />
                            <label htmlFor="boring" className="pl-1 pt-sm-0 pt-1">All products</label>
                        </div>
                        {
                            categorys.categories.map(category => (
                                <div className="form-inline border rounded p-sm-2 my-2" key={category._id}>
                                    <input type="radio" value={"category=" + category.name} key={category._id} name='category' />
                                    <label htmlFor="boring" className="pl-1 pt-sm-0 pt-1">{category.name}</label>
                                </div>
                            ))
                        }
                    </form>
                </div>

                <div>
                    <h6 className="p-1 border-bottom">Filter by:</h6>
                    <form className="ml-md-2" value={sort} onChange={e => setSort(e.target.value)}>
                        <div className="form-inline border rounded p-sm-2 my-2">
                            <input type="radio" name="type" value='sort=-numOfReviews' />
                            <label htmlFor="boring" className="pl-1 pt-sm-0 pt-1">NumberOfreview: High-Low</label>
                        </div>
                        <div className="form-inline border rounded p-sm-2 my-2">
                            <input type="radio" name="type" value='sort=-ratings' />
                            <label htmlFor="ugly" className="pl-1 pt-sm-0 pt-1">Ratings: High-Low</label>
                        </div>
                        <div className="form-inline border rounded p-md-2 p-sm-1">
                            <input type="radio" name="type" value='sort=-price' />
                            <label htmlFor="notugly" className="pl-1 pt-sm-0 pt-1">Price: Hight-Low</label>
                        </div>
                        <div className="form-inline border rounded p-md-2 p-sm-1">
                            <input type="radio" name="type" value='sort=price' />
                            <label htmlFor="notugly" className="pl-1 pt-sm-0 pt-1">Price: Low-Hight</label>
                        </div>
                    </form>
                </div>

            </section>

            <section id="products">


                <div className="container">
                    <input type="text" className='filter_search' value={searchs} placeholder="  Enter your search!"
                        onChange={e => setSearch(e.target.value)} />

                    {allproducts.result !== 0 ?
                        allproducts.products.map(product => (
                            <Products key={product._id} product={product} />
                        )) : <Notfoundproducts />
                    }
                </div>
                <Pagination totalPages={totalPages} page={page} />

            </section>
        </>
    )
}

export default Filters