export const GLOBALTYPES = {
    AUTH: "AUTH",
    ALERT: "ALERT",
    THEME: "THEME",
    MODAL: "MODAL",
    CATEGORY_MODAL: "CATEGORY_MODAL",
    PRODUCT_MODAL: "PRODUCT_MODAL",
    ADMIN_MODAL: "ADMIN_MODAL"
}


export const EditData = (data, id, post) => {
    const newData = data.map(item =>
        (item._id === id ? post : item)
    )
    return newData;
}

export const DeleteData = (data, id) => {
    const newData = data.filter(item => item._id !== id)
    return newData;
}