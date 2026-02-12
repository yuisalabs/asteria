<?php

namespace App\Http\Controllers\Workspace;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class WorkspaceController extends Controller
{
    public function index()
    {
        return Inertia::render('workspace/WorkspaceIndexPage');
    }
}
