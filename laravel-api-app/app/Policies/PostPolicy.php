<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PostPolicy
{
    /**
     * Determine if the given post can be modified by the user.
     */
    public function modify(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }
}
