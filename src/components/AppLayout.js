import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import PostLists from "./PostLists";
import Post from "./Post";
import NewPost from "./NewPost";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
import Stats from "./Stats";

function AppLayout() {
    const [user, setUser] = useState(null);

    const logOut = () => setUser(null);

    return (
        <>
            <nav style={{ margin: 10 }}>
                <Link to="/posts" style={{ padding: 5 }}> Posts </Link>
                <span> | </span>
                {user && <Link to="/stats" style={{ padding: 5 }}> Stats </Link>}
                {user && <Link to="/newpost" style={{ padding: 5 }}> New Post </Link>}
                {!user && <Link to="/login" style={{ padding: 5 }}> Login </Link>}
                {user && <span onClick={logOut} style={{ padding: 5, cursor: 'pointer' }}> Logout </span>}
            </nav>

            <Routes>
                <Route path="/posts" element={<PostLists />} />
                <Route path="/stats" element={<ProtectedRoute user={user}><Stats /></ProtectedRoute>} />
                <Route path="/posts/:slug" element={<Post />} />
                <Route path="/login" element={<Login onLogin={setUser} />} />
                <Route path="/newpost" element={<ProtectedRoute user={user}><NewPost /></ProtectedRoute>} />
                <Route path="*" element={<div>Page not found</div>} />
            </Routes>
        </>
    );
}

export default AppLayout;
