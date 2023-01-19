<?php
session_start();
// Change this to your connection info.
$DATABASE_HOST = 'localhost';
$DATABASE_USER = 'root';
$DATABASE_PASS = '';
$DATABASE_NAME = 'Cclogin';
// Try and connect using the info above.
$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
if ( mysqli_connect_errno() ) {
    // If there is an error with the connection, stop the script and display the error.
    exit('Failed to connect to MySQL: ' . mysqli_connect_error());
}



// Now we check if the data from the signup form was submitted, isset() will check if the data exists.
if ( !isset($_POST['name'],$_POST['email'], $_POST['password']) ) {
    // Could not get the data that should have been sent.
    exit('Please fill all fields!');
    $stmt->bind_param('ss', $_POST['email'], $_POST['username']);
    
}
if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['password'])) {
exit('Please fill all fields!');
}


// Check if the email or username already exists in the database
if ($stmt = $con->prepare('SELECT id FROM accounts WHERE email = ? or username = ?')) {
    $stmt->bind_param('ss', $_POST['email'], $_POST['username']);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        echo 'Username or email already exists, please choose another!';
        $stmt->close();
    } else {
        $stmt->close();
        // Prepare our SQL, preparing the SQL statement will prevent SQL injection.
        if ($stmt = $con->prepare('INSERT INTO accounts (username, email, password) VALUES (?, ?, ?)')) {
            // Bind parameters (s = string, i = int, b = blob, etc), in our case the username is a string so we use "s"
            $stmt->bind_param('sss', $_POST['name'],$_POST['email'], $_POST['password']);
            $stmt->execute();
            echo 'You have successfully registered, you can now login!';
            session_regenerate_id();
            $_SESSION['loggedin'] = TRUE;
            $_SESSION['name'] = $_POST['username'];
            $_SESSION['id'] = $id;
            header('Location: home.php');
            $stmt->close();
        } else {
            echo 'Could not prepare statement!';
        }
    }
}
$con->close();
?>