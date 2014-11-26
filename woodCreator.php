<?php

//"_style":1,"_titleX":10,"_titleY":10

// 0 要解锁的木块 1 水平短木块  2 水平长木块 3 垂直短木块 4 垂直长木块

// 0 水平移动 1垂直移动

$width = 480;
$height = 800;

// 垂直
$vertical_width = $width/6;
// 垂直短
$vertical_height_1 = $width/3;
// 垂直长
$vertical_height_2 = $width/2;

//水平
// 水平短
$horizontal_width = $width/3;
// 水平长
$horizontal_width_1 = $width/2;
$horizontal_height = $width/6;

$wood[] = array('_direction'=> 1,'_titleX' => 0,'_titleY' => 0,'_style' => 3,'_width' => $vertical_width,'_height' => $vertical_height_1);
$wood[] = array('_direction'=> 1,'_titleX' => 0,'_titleY' => $height/3,'_style' => 3,'_width' => $vertical_width,'_height' => $vertical_height_1);
$wood[] = array('_direction'=> 1,'_titleX' => ($width/6)*2,'_titleY' => 0,'_style' => 3,'_width' => $vertical_width,'_height' => $vertical_height_1);
$wood[] = array('_direction'=> 0,'_titleX' => ($width/2),'_titleY' => 0,'_style' => 2,'_width' => $horizontal_width_1,'_height' => $horizontal_height);
$wood[] = array('_direction'=> 1,'_titleX' => ($width/6)*3,'_titleY' => $width/6,'_style' => 3,'_width' => $vertical_width,'_height' => $vertical_height_1);
$wood[] = array('_direction'=> 1,'_titleX' => ($width/6)*3,'_titleY' => $width/6,'_style' => 4,'_width' => $vertical_width,'_height' => $vertical_height_2);
$wood[] = array('_direction'=> 1,'_titleX' => ($width/6)*1,'_titleY' => $width/2,'_style' => 4,'_width' => $vertical_width,'_height' => $vertical_height_2);
$wood[] = array('_direction'=> 0,'_titleX' => ($width/6)*2,'_titleY' => $width/2,'_style' => 2,'_width' => $horizontal_width_1,'_height' => $horizontal_height);

$wood[] = array('_direction'=> 0,'_titleX' => ($width/3),'_titleY' => ($width/6)*5,'_style' => 1,'_width' => $horizontal_width,'_height' => $horizontal_height);
$wood[] = array('_direction'=> 0,'_titleX' => ($width/6)*2,'_titleY' => ($width/6)*5,'_style' => 1,'_width' => $horizontal_width,'_height' => $horizontal_height);

$str = json_encode($wood);
file_put_contents('wood.sample.json',$str);exit;



