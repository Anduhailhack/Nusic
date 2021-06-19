<?php
    include_once(__DIR__ . "/database.php");
	
	header("Content-Type: text/json");
	
	$response = array();
	$db = new Database();

    $id = filter_var($_POST["id"], FILTER_SANITIZE_STRING);
	
    $result = $db->deleteQuotes($id);

    $response = array(
        "reply" => $result
    );

    echo json_encode($response);
?>