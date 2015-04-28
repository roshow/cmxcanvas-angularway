<?php

	$uri = $_SERVER["REQUEST_URI"];
	$is_match = preg_match_all("/^\/issues\/([a-zA-Z0-9]+)/", $uri, $matches_out);

		
	$id = ($is_match) ? $matches_out[1][0] : "rev04";
	
	$url =  'https://canvasbookapi.herokuapp.com/books/' . $id;

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true ); 
	$json = curl_exec($ch);
	curl_close($ch);

	$json = json_decode($json);
	$bookdata = $json->data[0];

	$title = $bookdata->series->name . " " . $bookdata->issue . ": " . $bookdata->title;
	$image = $bookdata->thumb;
	$description = "a comic by Michael Powell and Rolando Garcia";

?>

<title><?= $title ?></title>
<meta property="og:title" content="<?= $title ?>"> 
<meta property="og:description" content="<?= $description ?>"> 
<meta property="og:image" content="<?= $image ?>">