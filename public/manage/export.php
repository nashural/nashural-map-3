<?php
  $id = filter_var($_GET['group_id'], FILTER_SANITIZE_STRING);
  $data = json_decode(file_get_contents("../data/$id.json"));

  foreach ($data->features as $feature) {
    $feature->properties->description = $feature->properties->articleHref . "\n" . $feature->properties->previewSrc;
  }

  echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
