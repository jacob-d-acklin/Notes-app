<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNotesRequest;
use App\Models\Note;
use App\Models\User;
use Brick\Math\BigInteger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $retrieveAllNotes = Note::where('user_id', '=', $userId)->get();

        return response($retrieveAllNotes);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNotesRequest $request)
    {
        $randomNumber = random_int(100000, 999999);

        $createdNote = new Note();
        $createdNote->id = $randomNumber;
        $createdNote->user_id = $request->user()->id;
        $createdNote->title = $request->input('title');
        $createdNote->body = $request->input('body');

        $createdNote->save();

        return response([$createdNote,200]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        //



    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $payLoad = json_decode($request->getContent(), true);
        $id = $payLoad['id'];

        $getNote = Note::query()->find($id);

        if ($getNote) {
            $getNote->title = $payLoad['title'];
            $getNote->body = $payLoad['body'];

            $getNote->save();
        }

        return response([$getNote]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Note::find($id)->delete();

        return response("", 200);


    }
}
