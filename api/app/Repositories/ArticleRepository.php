<?php
namespace App\Repositories;

use App\Models\Article;

class ArticleRepository {
    protected $model;

    public function __construct(Article $model) {
        $this->model = $model;
    }

    public function all() {
        return $this->model->orderBy('created_at', 'desc')->get();
    }

    public function paginate(int $perPage = 10) {
        return $this->model->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function create(array $data) {
        return $this->model->create($data);
    }

    public function findById($id) {
        return $this->model->find($id);
    }

    public function update(Article $article, array $data) {
        $article->update($data);
        return $article;
    }

    public function delete(Article $article) {
        $article->delete();
    }
}
