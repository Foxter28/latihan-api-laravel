import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        }
    };

    return (
        <div className="max-w-md mx-auto my-12 p-8 bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
            <p className="text-center text-slate-400 mb-8">Log in to your account</p>
            
            {error && (
                <div className="bg-red-500/10 text-red-500 text-sm text-center p-3 rounded-lg mb-6 border border-red-500/20">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                    <input 
                        type="email" 
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                    <input 
                        type="password" 
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-[0_4px_12px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 transition duration-200 mt-6">
                    Login
                </button>
            </form>
            
            <p className="text-center mt-6 text-slate-400 text-sm">
                Don't have an account? <Link to="/register" className="text-blue-400 hover:text-blue-300 transition">Register here</Link>
            </p>
        </div>
    );
}
