<?php
	define("DB_HOST", "localhost");
	define("DB_USER", "root");
	define("DB_PASS", "");
	define("DB_PORT", 3306);
	define("DB_NAME", "MAIN");
	
	class Database
	{
		private $dbConnection;
		
		function __construct()
		{
			$this->dbConnection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
		}
		
		function fetchQuotes()
		{
			$query = "SELECT * FROM quotes ORDER BY id DESC;";
			$result = $this->dbConnection->query($query);
			
			if (mysqli_errno($this->dbConnection) != 0)
			{
				return mysqli_error($this->dbConnection);
			}
			
			return $result;
		}
		
		function fetchUsers()
		{
			$query = "SELECT user, pass FROM users;";
			$result = $this->dbConnection->query($query);
			
			if (mysqli_errno($this->dbConnection) != 0)
			{
				return mysqli_error($this->dbConnection);
			}
			
			return $result;
		}
		
		function insertQuotes($header, $body, $footer)
		{
			$header = $this->dbConnection->real_escape_string($header);
			$body = $this->dbConnection->real_escape_string($body);
			$footer = $this->dbConnection->real_escape_string($footer);
			
			$prepare_query = $this->dbConnection->prepare_query("INSERT INTO quotes (header, body, footer) VALUES (?, ?, ?)");
			$prepare_query->bind_param("sss", $header, $body, $footer);
			
			$prepare_query->execute();
            $prepare_query->close();
            
            if(mysqli_errno($this->dbConnection) != 0)
            {
            	return mysqli_error($this->dbConnection);	
            }
		}
		
		function __distruct()
        {
            $this->dbConnection->close();
        }
	}
?>