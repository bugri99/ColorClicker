<?php
// We need to use sessions, so you should always start sessions using the below code.
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
	header('Location: signin.html');
	exit;
}


?>

<!DOCTYPE html>
<html>
	<head>
	<script src="index.js"></script>
		<meta charset="utf-8">
		<title>Home Page</title>
		<link href="style.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css">
	</head>

	<body class="loggedin">

	<div class="hintergrund">
		<img src="hintergrund.svg" width="1915px" >
	</div>



	
	<div class="circle1"></div>

	</div>
	

	<nav class="navtop">
    <div id="profile">
        <a href="public/index.html">
			 <img src="start.png">
			 
        </a>
    </div>
</nav>


	

		


		<div class="bild">
			<img src="graffiti.png" width="130%" >
        <form>
		</div>


		

		<div id="allthethings">
	<div id="single"><p>Einstellungen</p></div>
  <div id="multiplayer"><p>Bestenliste</p></div> 
  <a href="logout.php">
  <div id="options"><p>Abmelden</p></div>
  </a>
  <a href="profile.php">
  <div id="credits"><p>Konto</p></div>
  </a>
  <div id="left"></div> 
	<div id="right"></div>
  


        
	</body>
</html>




