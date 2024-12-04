<?php

// app/Services/QueryService.php
namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;

class QueryService
{
    public function executeQuery($query, $bindings)
    {
        try {
            $results = DB::select($query, $bindings);
            return $results;
        } catch (QueryException $e) {
            Log::error('Query Error');
            Log::error('Query: ' . $query);
            Log::error('Bindings: ' . json_encode($bindings));
            Log::error('Exception: ' . $e->getMessage());
            
            throw new QueryException(
                $this->getName(),
                $query,
                $this->prepareBindings($bindings),
                $e
            );
        }
    }

    public function getName()
    {
        return 'QueryService Query';
    }

    public function prepareBindings($bindings)
    {
        return $bindings;
    }
}


