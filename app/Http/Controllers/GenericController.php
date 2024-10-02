<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GenericController extends Controller
{
    public function delete(Request $request, $entity) {
        $className = '\App\Models\\' . $entity;
        $ids = explode(',', $request->get('ids'));

        $className::whereIn('id', $ids)->delete();
        return redirect()->back();
    }
}
