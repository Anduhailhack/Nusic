<?php
    include_once(__DIR__ . "/database.php");
	
	header("Content-Type: text/json");
	
	$response = array();
	$db = new Database();

	$header = filter_var($_POST["header"], FILTER_SANITIZE_STRING);
    $body = filter_var($_POST["body"], FILTER_SANITIZE_STRING);
	$footer = filter_var($_POST["footer"], FILTER_SANITIZE_STRING);

    $result = $db->insertQuotes($header, $body, $footer);

    $response = array(
        "reply" => $result
    );

    echo json_encode($response);

?>