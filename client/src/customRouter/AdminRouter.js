import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRouter = ({ children }) => {

    const { auth } = useSelector((state) => state);
    return auth.user.role === "admin" ? <>{children}</> : <Navigate to="/" />;

}

export default AdminRouter