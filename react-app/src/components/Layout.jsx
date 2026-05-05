import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
    const { user, logout } = useAuth();

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        FullStack App
                    </Link>
                    <div className="flex gap-6 items-center">
                        <Link to="/" className="font-medium text-slate-100 hover:text-blue-500 transition">Home</Link>
                        {user ? (
                            <>
                                <Link to="/posts/create" className="font-medium text-slate-100 hover:text-blue-500 transition">Create Post</Link>
                                <button onClick={logout} className="px-4 py-2 text-sm font-semibold rounded-lg border border-white/10 hover:bg-white/10 transition">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="font-medium text-slate-100 hover:text-blue-500 transition">Login</Link>
                                <Link to="/register" className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-500 text-white hover:bg-blue-600 hover:-translate-y-0.5 transition shadow-[0_4px_12px_rgba(59,130,246,0.3)]">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
                <Outlet />
            </main>
        </div>
    );
}
