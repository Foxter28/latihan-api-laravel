import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

import toast from 'react-hot-toast';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchPosts = useCallback(async () => {
        try {
            const { data } = await api.get('/posts');
            setPosts(data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line
        fetchPosts();
    }, [fetchPosts]);

    const deletePost = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        try {
            await api.delete(`/posts/${id}`);
            toast.success('Post deleted successfully');
            await fetchPosts();
        } catch (error) {
            toast.error('Failed to delete post');
            console.error('Error deleting post:', error);
        }
    };

    if (loading) return <div className="text-center mt-8 text-slate-400">Loading...</div>;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
            {posts.length === 0 ? (
                <div className="bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center">
                    <p className="text-slate-400 text-lg">No posts available yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map(post => (
                        <div key={post.id} className="bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 flex flex-col">
                            <h2 className="text-xl font-semibold mb-2 text-slate-100">{post.title}</h2>
                            <p className="text-sm text-slate-400 mb-4">By {post.user?.name || 'Unknown'} on {new Date(post.created_at).toLocaleDateString()}</p>
                            <p className="text-slate-300 leading-relaxed mb-6 line-clamp-3 flex-1">{post.body}</p>
                            
                            <div className="flex gap-2 pt-4 border-t border-white/10 mt-auto">
                                <Link to={`/posts/${post.id}`} className="flex-1 text-center px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition font-semibold">Read More</Link>
                                
                                {user && user.id === post.user?.id && (
                                    <>
                                        <Link to={`/posts/${post.id}/edit`} className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition font-semibold">Edit</Link>
                                        <button onClick={() => deletePost(post.id)} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-semibold">Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
