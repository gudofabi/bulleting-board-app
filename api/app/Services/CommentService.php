<?php

namespace App\Services;

use App\Repositories\CommentRepository;

class CommentService
{
    protected $commentRepository;

    public function __construct(CommentRepository $commentRepository) {
        $this->commentRepository = $commentRepository;
    }

    public function getCommentsByArticle($articleId) {
        return $this->commentRepository->findByArticle($articleId);
    }

    public function createComment(array $data) {
        return $this->commentRepository->create($data);
    }

    public function getComment($id) {
        return $this->commentRepository->findById($id);
    }

    public function updateComment($id, array $data) {
        $comment = $this->commentRepository->findById($id);
        if (!$comment) {
            throw new \Exception('Comment not found.');
        }
        return $this->commentRepository->update($comment, $data);
    }

    public function deleteComment($id) {
        $comment = $this->commentRepository->findById($id);
        if (!$comment) {
            throw new \Exception('Comment not found.');
        }
        $this->commentRepository->delete($comment);
    }
}
