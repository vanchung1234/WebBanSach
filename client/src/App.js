import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from "./component/alert/Alert";
import Loading from "./component/alert/Loading";
import CategoryModal from "./component/CategoryModal";
import Footer from "./component/layout/Footer";
import Header from "./component/layout/Header/Header";
import UserOptions from "./component/layout/Header/UserOptions";
import ScrollButton from "./component/layout/ScrollButton";
import ProductModal from "./component/Product/ProductModal";
import UpdateModal from "./component/updateModal";
import PageRender from "./customRouter/PageRender";
import ProtectedRouter from "./customRouter/ProtectedRouter";
import ForgotPassword from "./pages/forgotPassword";
import Home from "./pages/Home";
import Login from "./pages/login";
import UpdatePassword from "./pages/updatePassword";
import { getCategories } from "./redux/action/categoryAction";
import Dashboard from "./pages/dashboard";
import ProductList from "./pages/dashboard/ProductList";
import UserList from "./pages/dashboard/UserList";
import UpdateUser from "./pages/dashboard/UpdateUser";
import OrderList from "./pages/dashboard/OrderList";
import Products from "./pages/products";
import Product from "./pages/product/[id]";
import AdminRouter from "./customRouter/AdminRouter";
import Category from "./pages/category";
import Contact from "./pages/contact";
function App() {
  const { auth, modal, categoryModal, productModal, alert } = useSelector(state => state)
  const pathname = window.location.pathname

  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(getCategories(auth))
  }, [dispatch])

  return (
    <BrowserRouter>

      {
        pathname !== "/dashboard" &&
        <Header />
      }




      {auth.token && <UserOptions />}
      {modal && <UpdateModal />}
      {categoryModal && <CategoryModal />}
      {productModal && <ProductModal />}
      {alert.loading &&
        <Loading />}
      <Alert />
      <Routes>
        <Route path="/dashboard" element={<ProtectedRouter><AdminRouter><Dashboard /></AdminRouter></ProtectedRouter>} />
        <Route path="/dashboard/products" element={<ProductList />} />
        <Route path="/dashboard/users" element={<UserList />} />
        <Route path="/dashboard/users/update" element={<UpdateUser />} />
        <Route path="/dashboard/orders" element={<OrderList />} />
        <Route path="/dashboard/category" element={<Category />} />

        <Route
          path="/:page"
          element={
            <ProtectedRouter>
              <PageRender />
            </ProtectedRouter>
          }
        />
        <Route
          path="/:page/:id"
          element={
            <ProtectedRouter>
              <PageRender />
            </ProtectedRouter>


          }
        />
        <Route path="updatePassword" element={
          <ProtectedRouter>
            <UpdatePassword />
          </ProtectedRouter>}
        />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/product/:id" element={<Product />} />

      </Routes>
      {
        pathname !== "/dashboard" &&
        <Footer />
      }

      <ScrollButton />
    </BrowserRouter>

  );
}

export default App;
