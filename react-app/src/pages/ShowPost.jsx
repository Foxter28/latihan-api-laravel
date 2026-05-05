import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

import toast from 'react-hot-toast';

export default function ShowPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchPost = useCallback(async () => {
        try {
            const { data } = await api.get(`/posts/${id}`);
            setPost(data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching post:', error);
            navigate('/');
        }
    }, [id, navigate]);

    useEffect(() => {
        // eslint-disable-next-line
        fetchPost();
    }, [fetchPost]);

    const deletePost = async () => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        try {
            await api.delete(`/posts/${id}`);
            toast.success('Post deleted successfully');
            navigate('/');
        } catch (error) {
            toast.error('Failed to delete post');
            console.error('Error deleting post:', error);
        }
    };

    if (loading) return <div className="text-center mt-8 text-slate-400">Loading...</div>;
    if (!post) return <div className="text-center mt-8 text-slate-400">Post not found</div>;

    return (
        <div className="max-w-4xl mx-auto my-8 p-10 bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-sm text-slate-400 mb-8 pb-4 border-b border-white/10">
                By <span className="font-semibold text-slate-300">{post.user?.name || 'Unknown'}</span> on {new Date(post.created_at).toLocaleDateString()}
            </p>
            
            <div className="text-slate-200 text-lg leading-relaxed whitespace-pre-wrap mb-12">
                {post.body}
            </div>
            
            <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                <Link to="/" className="px-6 py-2 rounded-lg border border-white/10 hover:bg-white/10 text-slate-200 font-semibold transition">
                    &larr; Back to Posts
                </Link>
                
                {user && user.id === post.user?.id && (
                    <div className="ml-auto flex gap-4">
                        <Link to={`/posts/${post.id}/edit`} className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-[0_4px_12px_rgba(59,130,246,0.3)] transition hover:-translate-y-0.5">
                            Edit Post
                        </Link>
                        <button onClick={deletePost} className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition hover:-translate-y-0.5">
                            Delete Post
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
