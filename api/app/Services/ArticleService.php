<?php

namespace App\Services;

use App\Repositories\ArticleRepository;
use Auth;

class ArticleService
{
    protected $articleRepository;

    public function __construct(ArticleRepository $articleRepository) {
        $this->articleRepository = $articleRepository;
    }

    public function getArticles() {
         $articles = $this->articleRepository->all();
         $articles->load('user');
         return $articles;
    }

    public function getArticle($id) {
        $article = $this->articleRepository->findById($id);
        $article->load('user');
        return $article;
    }

    public function createArticle(array $data) {
        $article =  $this->articleRepository->create($data);
        $article->load('user');
        return $article;
    }

    public function updateArticle($id, array $data) {
        $article = $this->articleRepository->findById($id);
        if (!$article) {
            throw new \Exception('Article not found.');
        }
        return $this->articleRepository->update($article, $data);
    }

    public function deleteArticle($id) {
        $article = $this->articleRepository->findById($id);
        if (!$article) {
            throw new \Exception('Article not found.');
        }
        $this->articleRepository->delete($article);
    }
}
