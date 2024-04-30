<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'article_id',
        'user_id'
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d', // Cast to date with format Y-m-d
        'updated_at' => 'datetime:Y-m-d H:i:s', // Include time
    ];

    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
