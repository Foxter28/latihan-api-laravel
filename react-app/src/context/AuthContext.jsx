/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            // Fetch actual user data to get the ID and other details correctly
            api.get('/user').then(res => {
                setUser(res.data);
            }).catch(() => {
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = async (email, password) => {
        const { data } = await api.post('/login', { email, password });
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        toast.success('Welcome back!');
        navigate('/');
    };

    const register = async (name, email, password, password_confirmation) => {
        const { data } = await api.post('/register', { 
            name, email, password, password_confirmation 
        });
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        toast.success('Account created successfully!');
        navigate('/');
    };

    const logout = async () => {
        try {
            await api.post('/logout');
            toast.success('Logged out');
        } catch (error) {
            console.error(error);
        } finally {
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
