<?php

namespace App\Repositories;

use App\Models\Comment;

class CommentRepository {
    protected $model;

    public function __construct(Comment $model) {
        $this->model = $model;
    }

    public function all() {
        return $this->model->all();
    }

    public function findByArticle($articleId) {
        return $this->model->where('article_id', $articleId)->orderBy('created_at', 'desc')->get();
    }

    public function create(array $data) {
        return $this->model->create($data);
    }

    public function findById($id) {
        return $this->model->find($id);
    }

    public function update(Comment $comment, array $data) {
        $comment->update($data);
        return $comment;
    }

    public function delete(Comment $comment) {
        $comment->delete();
    }
}
