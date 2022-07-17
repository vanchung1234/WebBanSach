import React from 'react'

const BgImage = () => {
    const url = window.location.pathname

    if (url === '/dashboard' || url === '/' || url === '/login' || url === '/dashboard/orders' || url === '/dashboard/products') return null;
    return (
        <div className="hero-image">

        </div>
    )
}

export default BgImage