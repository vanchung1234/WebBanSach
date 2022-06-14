import {
    LineStyle,

    PermIdentity,
    Storefront,
    AttachMoney,

    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
const Sidebar = () => {
    return (

        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                    <Link to="/" className="link">
                        <li className="sidebarListItem ">
                            <LineStyle className="sidebarIcon" />
                            Home
                        </li>
                    </Link>
                    <Link to="/dashboard" className="link">
                        <li className="sidebarListItem ">
                            <LineStyle className="sidebarIcon" />
                            Dashboard
                        </li>
                    </Link>

                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Quick Menu</h3>
                <ul className="sidebarList">
                    <Link to="/dashboard/users" className="link">
                        <li className="sidebarListItem">
                            <PermIdentity className="sidebarIcon" />
                            Users
                        </li>
                    </Link>
                    <Link to="/dashboard/products" className="link">
                        <li className="sidebarListItem">
                            <Storefront className="sidebarIcon" />
                            Products
                        </li>
                    </Link>
                    <Link to="/dashboard/orders" className="link">
                        <li className="sidebarListItem">
                            <AttachMoney className="sidebarIcon" />
                            Orders
                        </li>
                    </Link>
                    <Link to="/dashboard/category" className="link">
                        <li className="sidebarListItem">
                            <WorkOutline className="sidebarIcon" />
                            Category
                        </li>
                    </Link>

                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Notifications</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <MailOutline className="sidebarIcon" />
                        Mail
                    </li>
                    <li className="sidebarListItem">
                        <DynamicFeed className="sidebarIcon" />
                        Feedback
                    </li>
                    <li className="sidebarListItem">
                        <ChatBubbleOutline className="sidebarIcon" />
                        Messages
                    </li>
                </ul>
            </div>

        </div>

    )
}

export default Sidebar
