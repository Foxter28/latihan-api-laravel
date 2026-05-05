import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

import toast from 'react-hot-toast';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);
        try {
            await api.post('/posts', { title, body });
            toast.success('Post created successfully!');
            navigate('/');
        } catch (err) {
            setErrors(err.response?.data?.errors || { general: ['Failed to create post'] });
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-8 p-8 bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold text-center mb-8">Create New Post</h1>
            
            {errors?.general && (
                <div className="bg-red-500/10 text-red-500 text-sm text-center p-3 rounded-lg mb-6 border border-red-500/20">
                    {errors.general[0]}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                    <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                    {errors?.title && <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Content</label>
                    <textarea 
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-y" 
                        value={body} 
                        onChange={(e) => setBody(e.target.value)} 
                        required 
                        rows="6"
                    ></textarea>
                    {errors?.body && <p className="text-red-500 text-xs mt-1">{errors.body[0]}</p>}
                </div>
                <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-[0_4px_12px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 transition duration-200">
                        Create Post
                    </button>
                    <button type="button" onClick={() => navigate('/')} className="flex-1 py-3 px-4 bg-transparent border border-white/10 hover:bg-white/10 text-slate-200 font-semibold rounded-lg transition duration-200">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
