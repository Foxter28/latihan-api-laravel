import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import ShowPost from './pages/ShowPost';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
};

// Guest Route Component (prevent logged in users from seeing login/register)
const GuestRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (user) return <Navigate to="/" />;
    return children;
};

import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Toaster position="top-right" />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="posts/:id" element={<ShowPost />} />
                        
                        {/* Guest Routes */}
                        <Route path="login" element={
                            <GuestRoute>
                                <Login />
                            </GuestRoute>
                        } />
                        <Route path="register" element={
                            <GuestRoute>
                                <Register />
                            </GuestRoute>
                        } />

                        {/* Protected Routes */}
                        <Route path="posts/create" element={
                            <ProtectedRoute>
                                <CreatePost />
                            </ProtectedRoute>
                        } />
                        <Route path="posts/:id/edit" element={
                            <ProtectedRoute>
                                <EditPost />
                            </ProtectedRoute>
                        } />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
