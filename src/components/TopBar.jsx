import { Link, Outlet } from "react-router"

const TopBar = () => {

    return (
        <>
        <div className="topbar-container">
            <h1>GuitarHub</h1>
            <h3>Explore Some Guitars</h3>
            <div className="topbar-links-container">
                <Link to="/">Home</Link>
                <Link to="/createpost">Create New Post</Link>
            </div>
        </div>
        <div className="page-content">
            <Outlet />
        </div>
        </>
    )

}

export default TopBar