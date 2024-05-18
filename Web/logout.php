<?php
session_start();
session_destroy(); // Destroy all sessions

// Redirect to the login page after logout
header("Location: login.php");
exit();
<<<<<<< HEAD
?>
=======
?>
>>>>>>> c885d8783d0cbcdcdb17ff6657a6472331994d9c
