<?php
	include_once(__DIR__ . "/database.php");
	
	header("Content-Type: text/json");
	
	$response = array();
	$db = new Database();
	$result = $db->fetchQuotes();
	$data = $result->fetch_assoc();
	
	do {
		$data = array(
			"id" => $data["id"],
			"header" => $data["header"],
			"body" => $data["body"],
			"footer" => $data["footer"]
		);
		//INSERT INTO quotes (header, body, footer) VALUES ("Middle Finger", "Purple is Red, violate is blue, i have five fingers the middle one is for you.", "nardi");
		array_push($response, $data);
	}while(($data = $result->fetch_assoc()) != NULL);


	echo json_encode($response);
?>