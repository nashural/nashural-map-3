<?php
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET');
  header("Access-Control-Allow-Headers: X-Requested-With");

  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    echo '';
  }

  function search_in_group($needle, $haystack, $groupId) {
    $needle = mb_strtolower($needle);
    $features = array();

    foreach ($haystack->features as $feature) {
      $iconCaption = mb_strtolower($feature->properties->iconCaption);
      $pos = strpos($iconCaption, $needle);
      if ($pos !== false) {
        array_push($features, $feature);
      }
    }

    return array(
      "groupId" => $groupId,
      "features" => $features
    );
  }

  $groups = json_decode(file_get_contents("../data/groups.json"))->groups;
  $searchPrefix = filter_var($_GET['searchPrefix'], FILTER_SANITIZE_STRING);
  $results = array();

  foreach ($groups as $group) {
    $group = json_decode(file_get_contents("../data/" . $group->id . ".json"));
    $result = search_in_group($searchPrefix, $group, $group->metadata->id);
    if (count($result['features']) > 0) {
      array_push($results, $result);
    }
  }

  echo json_encode(array(
    "searchPrefix" => $searchPrefix,
    "results" => $results,
  ), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
