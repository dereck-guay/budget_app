<?php

namespace App;

trait SearchableTrait
{
    public static function process_keywords($query, $keywords, $fields) {
        if (count($fields) <= 0) return $query;

        if (isset($keywords) && strlen($keywords) > 0) {
            $query->where(function ($query) use ($keywords, $fields) {
                $query->where($fields[0], 'like', "%$keywords%");

                foreach ($fields as $field)
                    $query->orWhere($field, 'like', "%$keywords%");
            });
        }
        
        return $query;
    }
}
