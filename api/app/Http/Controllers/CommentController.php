<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Services\CommentService;
use Auth;

class CommentController extends Controller
{
    protected $commentService;

    public function __construct(CommentService $commentService) {
        $this->commentService = $commentService;
    }

    public function index($articleId) {
        $comments = $this->commentService->getCommentsByArticle($articleId);
        return $comments;
    }

    public function store($articleId, Request $request) {
        $data = array_merge($request->all(), [
            'article_id' => $articleId,
            'user_id'    => Auth::user()->id
        ]);
        $comment = $this->commentService->createComment($data);
        return $comment;
    }

}
