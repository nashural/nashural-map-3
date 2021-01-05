<?php
  $csv_template = fopen("template.csv", "c");
  fputcsv($csv_template, array(
    "ID группы",
    "Группа",
    "Название",
    "Широта",
    "Долгота",
    "Картинка",
    "Статья"
  ));

  $groups = json_decode(file_get_contents("../data/groups.json"))->groups;

  foreach ($groups as $group) {
    fputcsv($csv_template, array(
      $group->id,
      $group->name
    ));
  }
  
  echo file_get_contents("template.csv");

  fclose($csv_template);
  unlink("template.csv");
