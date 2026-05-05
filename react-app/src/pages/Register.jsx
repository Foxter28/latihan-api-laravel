import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState(null);
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);
        try {
            await register(name, email, password, passwordConfirmation);
        } catch (err) {
            setErrors(err.response?.data?.errors || { general: ['Registration failed'] });
        }
    };

    return (
        <div className="max-w-md mx-auto my-12 p-8 bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>
            
            {errors?.general && (
                <div className="bg-red-500/10 text-red-500 text-sm text-center p-3 rounded-lg mb-6 border border-red-500/20">
                    {errors.general[0]}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                    <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                    {errors?.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                    <input 
                        type="email" 
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
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
                    {errors?.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Confirm Password</label>
                    <input 
                        type="password" 
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" 
                        value={passwordConfirmation} 
                        onChange={(e) => setPasswordConfirmation(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-[0_4px_12px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 transition duration-200 mt-6">
                    Register
                </button>
            </form>
            
            <p className="text-center mt-6 text-slate-400 text-sm">
                Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 transition">Login here</Link>
            </p>
        </div>
    );
}
