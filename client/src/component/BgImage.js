import React from 'react'

const BgImage = () => {
    const url = window.location.pathname.substring(1)

    const style = {
        display: (url === 'dashboard' || url === '' || url === 'login' || url === 'dashboard/orders' || url === 'dashboard/products') ? 'none' : 'block'
    }


    return (
        <div className="hero-image" style={style}>

        </div>
    )
}

export default BgImage