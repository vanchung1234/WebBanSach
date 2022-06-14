import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Pagination = ({ totalPages, page }) => {
    const [firstArr, setFirstArr] = useState([])
    const [lastArr, setLastArr] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const newArr = [...Array(totalPages)].map((_, i) => i + 1)
        if (totalPages < 4)
            return setFirstArr(newArr);

        if (totalPages - page >= 4) {
            setFirstArr(newArr.slice(page - 1, page + 2))
            setLastArr(newArr.slice(totalPages - 1))
        } else {
            setFirstArr(newArr.slice(totalPages - 4, totalPages))
            setLastArr([])
        }
    }, [totalPages, page])



    const isActive = (index) => {
        if (index === page) return "active"
        return ""
    }

    const prev = () => {
        const newPage = Math.max(page - 1, 1)
        navigate(`?page=${newPage}`)
    }

    const next = () => {
        const newPage = Math.min(page + 1, totalPages)
        navigate(`?page=${newPage}`)
    }

    const jump = (num) => {
        navigate(`?page=${num}`)
    }




    return (
        <div className='pagination'>
            <span onClick={prev}>&laquo;</span>

            {
                firstArr.map(num => (
                    <span key={num} className={`${isActive(num)}`}
                        onClick={() => jump(num)}>
                        {num}
                    </span>
                ))
            }

            {lastArr.length > 0 && <span>...</span>}

            {
                lastArr.map(num => (
                    <span key={num} className={`${isActive(num)}`}
                        onClick={() => jump(num)}>
                        {num}
                    </span>
                ))
            }

            <span onClick={next}>&raquo;</span>
        </div>
    )
}

export default Pagination