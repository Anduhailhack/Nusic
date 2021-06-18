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
		<div class="bar" id="admin_form">
			<form id="form" action="check_login.php" method="post">
				<div style="margin: 10px auto; color: rgba(178, 80, 160, 1);">
				<?php
					session_start();
					if(isset($_SESSION["errorMsg"]))
					{
						echo  $_SESSION["errorMsg"];
						$_SESSION["errorMsg"] = NULL;
					}
				?>
				</div>
				<input type="user" name="user" placeholder="@username"/>
				<input type="password" name="pass" placeholder="password"/>
				<input type="submit" class="btn" id="btn" value="Login"/>
			</form>
		</div>
		<script src="js/mobile.css.js"></script>
	</body>
</html>