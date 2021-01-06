<?php
  function parse_feature($line) {
    return array(
      'type' => "Feature",
      'id' => -1,
      'geometry' => array(
        'type' => "Point",
        'coordinates' => array(
          (float)$line[3],
          (float)$line[4]
        )
      ),
      'properties' => array(
        'group' => $line[0],
        'iconCaption' => $line[2],
        'previewSrc' => $line[5],
        'articleHref' => $line[6]
      )
    );
  }

  function line_has_content($line) {
    return isset($line[0]) && isset($line[2]) && isset($line[3]) && isset($line[4]) && isset($line[5]) && isset($line[6]);
  }

  function find_group_by_id($groups, $group_id) {
    foreach ($groups as $group) {
      if ($group->id === $group_id) {
        return $group;
      }
    }
  }

  function insert_feature($groups, $features) {
    foreach ($features as $feature) {
      $group = find_group_by_id($groups->groups, $feature['properties']['group']);
      if (isset($group)) {
        $feature['id'] = $group->count;
        $filename = "../data/".$group->id.'.json';
        $data = json_decode(file_get_contents($filename));
        array_push($data->features, $feature);
        file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        $group->count += 1;
      }
    }
    file_put_contents("../data/groups.json", json_encode($groups, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
  }

  header("Location: ..");

  $groups_file = fopen($_FILES['groups_file']['tmp_name'], 'r');
  $grouped_features = array();

  fgetcsv($groups_file); // Skip first line

  while ($line = fgetcsv($groups_file)) {
    if (line_has_content($line)) {
      $feature = parse_feature($line);
      $group = $feature['properties']['group'];
      if (!isset($grouped_features[$group])) {
        $grouped_features[$group] = array();
      }
      array_push($grouped_features[$group], $feature);
    }
  }

  $groups = json_decode(file_get_contents('../data/groups.json'));

  foreach (array_keys($grouped_features) as $group_id) {
    insert_feature($groups, $grouped_features[$group_id]);
  }
