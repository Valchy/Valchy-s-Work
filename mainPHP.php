<?php
	//db connection variables
	$servername = 'localhost';
	$username = 'root';
	$password = '';
	$dbname = 'firstdatabase';
	$temp = '';

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		// the '.' is like a '+' in JavaScript
		die('Connection failed: ' . $conn->connect_error); // Shows error message
	}

	// Заявка за четене на данни ('*' meand all columns)
	$sql = 'SELECT * FROM user'; // Задължително ли е да са с големи букви?
	$result = $conn->query($sql);

	// This fires after the post method from the form
	if (isset($_POST['input_mail'])) {
		// Error if any input is blank
		if ($_POST['input_name'] == '' || $_POST['input_mail'] == '' || $_POST['input_password'] == '') {
			$temp = '<br> Error: missing fields'; // This is the error message
		}
		else {
			// Returns true or false
			$finalCheck = checkData();

			// If informarion is duplicated no data is send to server
			if ($finalCheck === false) {
				$temp = '<br> Error: duplicated information';
			}
			// If true the request gets processed
			else if ($finalCheck === true) {
				// sprintf(is like function which we in this case use it to simplify the varibales and its values)
				$sql = sprintf("INSERT INTO `user` (`id`, `name`, `password`, `email`, `created`) VALUES (NULL, '%s', '%s', '%s', NOW());", $_POST['input_name'], $_POST['input_password'], $_POST['input_mail']); // NOW() gives todays date
				showAll();
				$insert = $conn->query($sql);
				if ($insert) { // if data inserted delete it xD
					$sql = ("DELETE FROM `user` WHERE `id` > '2'");
					$delete = $conn->query($sql);
					if ($delete) {
						$temp += 'Everything else deleted...';
					}
				}
			}
		}
	}

	// This creates a new user (directly)
	// $sql = "INSERT INTO `User` (`id`, `name`, `password`, `email`, `created`) VALUES (NULL, 'Valchy', 'valeri888', 'valchygaming@gmail.com', NOW());"; // NOW() gives todays date
	// $result = $conn->query($sql);
?>
<html>
<head>
<meta charset="utf-8">
<title> First Database data pull </title>
</head>

<body>
	<h1> First Database data pull </h1>

	<form action="" method="POST" accept-charset="utf-8">
		<input type="email" name="input_mail" placeholder="Email...">
		<input type="password" name="input_password" placeholder="Password...">
		<input type="text" name="input_name" placeholder="Your Name...">
		<input type="submit" value="Create Account">
	</form>

	<?php
		// This loop makes the newly made user have all its detailed showed on screen
		// foreach ($_POST as $key => $value) {
		// 	echo '<br>' . $key .' = '. $value;
		// }

		function checkData () {
			// Checks if data exists and if yes it continues into a loop
			global $result, $_POST;
			if ($result->num_rows > 0) {
				// -> is like '.' in javascript and . is like '+'
				while ($theRow = $result -> fetch_assoc()) {
					if ($theRow['email'] === $_POST['input_mail']) {
						return false;
					}
					else if ($theRow['name'] === $_POST['input_name']) {
						return false;
					}
				}

				return true;
			}
		}

		function showAll () {
			global $result;
			// Checking if there is data
			if ($result->num_rows > 0) {
				// Output data of each row
				while ($row = $result -> fetch_assoc()) {
					echo '<br> Hello: ' . $row['name'] . ' || ' . $row['password'];
				}
			}
			else {
				// This shows on page whether there is an error or the inputs value
				echo $temp;
			}
		}

		showAll();

		// Closes connection to data base
		$conn->close();
	?>
</body>
</html>

<!--
	Hopfullt this doc has everything I need for basic PHP understanding
	Make a copy to HTML + JavaScript Folder - DONE
-->