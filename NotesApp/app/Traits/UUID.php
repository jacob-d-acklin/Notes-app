<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait UUID
{
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
           if($model->getKey() === null){
               $model->setAttribute($model->getKeyName(), Str::uuid()->toString());
           }
        });
    }

    public function getIncrementing (): false
    {
        return false;
    }


    public function getKeyType (): string
    {
        return 'string';
    }
}


