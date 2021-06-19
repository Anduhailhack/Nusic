<?php
	include_once(__DIR__ . "/database.php");
	
	session_start();
	
	$user = filter_var($_POST["user"], FILTER_SANITIZE_STRING);
	$pass = filter_var($_POST["pass"], FILTER_SANITIZE_STRING);

	$db = new Database();
	$result = $db->fetchUsers();
	$data = $result->fetch_assoc();
	
	do {
		if ($data["user"] == $user && $data["pass"] == md5($pass))
		{
			$_SESSION["userId"] = $user;
			header("Location: dashboard.php");
			return;
		}
	} while(($data = $result->fetch_assoc()) != NULL);
	
	$_SESSION["errorMsg"] = "Wrong user or password!";
	header("Location: login.php");
?>