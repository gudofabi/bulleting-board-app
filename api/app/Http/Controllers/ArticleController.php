<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ArticleService;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\ArticleCollection;
use App\Http\Requests\ArticlePostRequest;
use Auth;

class ArticleController extends Controller
{
    protected $articleService;

    public function __construct(ArticleService $articleService) {
        $this->articleService = $articleService;
    }

    public function index() {
        $articles = $this->articleService->getArticles();
        return ArticleResource::collection($articles);
    }

    public function show($id) {
        $article = $this->articleService->getArticle($id);
        return new ArticleResource($article);
    }

    public function store(ArticlePostRequest $request) {
        $data = $request->all();
        $data['user_id'] = Auth::user()->id; // Set user_id in the controller
        $article = $this->articleService->createArticle($data);
        return new ArticleResource($article);
    }

    public function update(Request $request, $id) {
        try {
            $article = $this->articleService->updateArticle($id, $request->all());
            return new ArticleResource($article);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function destroy($id) {
        $this->articleService->deleteArticle($id);
        return response()->json(['message' => 'Successfully deleted the article.']);
    }
}
