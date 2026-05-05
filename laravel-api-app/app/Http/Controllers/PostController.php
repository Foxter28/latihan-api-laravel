<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Resources\PostResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PostController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('user')->latest()->get();
        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required'
        ]);

        $post = $request->user()->posts()->create($fields);

        return new PostResource($post->load('user'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return new PostResource($post->load('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        Gate::authorize('modify', $post);

        $fields = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required'
        ]);

        $post->update($fields);

        return new PostResource($post->load('user'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Post $post)
    {
        Gate::authorize('modify', $post);

        $post->delete();

        return [
            'message' => 'Post deleted'
        ];
    }
}
