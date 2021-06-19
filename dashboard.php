<html>
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width"/>
		<link href="css/mobile.css" rel="stylesheet"/>
	</head>
	<body>
		<div class="bar" id="status_bar">
			<b>ÑARDI</b>		
		</div>
		<div class="bar" id="main_bar">
			<div id="content"> 
				<button class="btn" id="addBtn">Create post</button>
				<div id="content_title"></div>
				<div id="content_body"></div>
				<div id="content_footer"></div>
			</div>
			<?php
				session_start();

				if (!isset($_SESSION["userId"]))
				{
					$_SESSION["userId"] = NULL;
					header("Location: login.php");
					die();	
				}
			?>
		</div>
		<script src="js/admin_mobile.js"></script>
		<script src="js/mobile.css.js"></script>
	</body>
</html>