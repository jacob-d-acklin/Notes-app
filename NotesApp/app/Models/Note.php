<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @method static create(mixed $data)
 */
class Note extends Model
{
    use HasFactory;



    protected $fillable = ['user_id','title', 'body'];

    protected $hidden = [

    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at'=> 'datetime'
    ];


    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
