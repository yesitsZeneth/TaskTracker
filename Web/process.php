<?php
session_start();
include("config.php");

// Function to check if the email exists as a Google account
function isGoogleAccount($email) {
    // Use an API or library to verify if the email exists as a Google account
    // For demonstration purposes, we'll assume all emails are Google accounts
    return true;
}

if (isset($_POST["registerButton"])) {
<<<<<<< HEAD
=======

>>>>>>> c885d8783d0cbcdcdb17ff6657a6472331994d9c
    $student_id = $_POST['student_id'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $firstname = $_POST['firstname'];
    $middlename = isset($_POST['middlename']) ? $_POST['middlename'] : '';
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];

    // Check if the email exists as a Google account
    if (!isGoogleAccount($email)) {
        $_SESSION['status'] = "Please use a Google account email for registration.";
        $_SESSION['status_code'] = "error";
        header("Location: register.php");
        exit();
    }

    $check_id_query = "SELECT * FROM `tbl_users` WHERE `student_id` = '$student_id'";
    $id_result = mysqli_query($con, $check_id_query);
    $id_count = mysqli_num_rows($id_result);

    if ($id_count > 0) {
        $_SESSION['status'] = "This ID already exists";
        $_SESSION['status_code'] = "error";
        header("Location: register.php");
        exit();
    }

    if ($password !== $repassword) {
        $_SESSION['status'] = "Password does not match";
        $_SESSION['status_code'] = "error";
        header("Location: register.php");
        exit();
    }

<<<<<<< HEAD
    // Hash the password before saving to the database
    $password_hashed = md5($password); // or use a more secure hashing method like bcrypt

    // Default profile picture URL
    $image = "img/pfp.jpg";

    // Insert the user details into the database with default profile picture URL
    $query = "INSERT INTO `tbl_users`(`student_id`, `password`, `firstname`, `middlename`, `lastname`, `email`, `image`) VALUES ('$student_id','$password_hashed','$firstname','$middlename','$lastname','$email','$image')";
    $query_result = mysqli_query($con, $query);

    if ($query_result) {
        $_SESSION['student_id'] = $student_id;
        $_SESSION['status'] = "Registration Successful!";
=======
    // Default profile picture path
    $profile_picture = 'img/default_pfp.png';

    // Insert the user details into the database with the default profile picture
    $query = "INSERT INTO `tbl_users`(`student_id`, `password`, `firstname`, `middlename`, `lastname`, `email`, `profile_picture`) 
              VALUES ('$student_id','$password','$firstname','$middlename','$lastname','$email','$profile_picture')";
    $query_result = mysqli_query($con, $query);

    if ($query_result) {
        // Set the necessary session variables
        $_SESSION['loggedin'] = true;
        $_SESSION['student_id'] = $student_id;
        $_SESSION['firstname'] = $firstname;
        $_SESSION['middlename'] = $middlename;
        $_SESSION['lastname'] = $lastname;
        $_SESSION['status'] = "Welcome";
>>>>>>> c885d8783d0cbcdcdb17ff6657a6472331994d9c
        $_SESSION['status_code'] = "success";
        header("Location: index.php");
        exit();
    }
}

if (isset($_POST["loginButton"])) {
<<<<<<< HEAD
    $student_id = $_POST['student_id'];
    $password = $_POST['password'];

    // Hash the password to match the stored hash
    $password_hashed = md5($password); // or use the same hashing method as during registration

    $login_query = "SELECT `student_id`, `password`, `firstname`, `middlename`, `lastname` FROM `tbl_users` WHERE `student_id` = '$student_id' AND `password` = '$password_hashed' LIMIT 1";
    $login_result = mysqli_query($con, $login_query);

    if (mysqli_num_rows($login_result) == 1) {
        $user = mysqli_fetch_assoc($login_result);
        $_SESSION['loggedin'] = true;
        $_SESSION['student_id'] = $user['student_id'];
=======

    $student_id = $_POST['student_id'];
    $password = $_POST['password'];

    $login_query = "SELECT `student_id`, `password`, `firstname`, `middlename`, `lastname` FROM `tbl_users` WHERE `student_id` = '$student_id' AND `password` = '$password' LIMIT 1 ";
    $login_result = mysqli_query($con, $login_query);

    if ($login_result && mysqli_num_rows($login_result) == 1) {
        $user = mysqli_fetch_assoc($login_result);
        $_SESSION['loggedin'] = true;
        $_SESSION['student_id'] = $student_id;
>>>>>>> c885d8783d0cbcdcdb17ff6657a6472331994d9c
        $_SESSION['firstname'] = $user['firstname'];
        $_SESSION['middlename'] = $user['middlename'];
        $_SESSION['lastname'] = $user['lastname'];
        $_SESSION['status'] = "Welcome!";
        $_SESSION['status_code'] = "success";
        header("Location: index.php");
        exit();
    } else {
        $_SESSION['status'] = "Invalid Username/Password";
        $_SESSION['status_code'] = "error";
        header("Location: login.php");
        exit();
    }
}

<<<<<<< HEAD
=======

>>>>>>> c885d8783d0cbcdcdb17ff6657a6472331994d9c
if (isset($_POST["submitButton"])) {
    $task_course = $_POST['task_course'];
    $task_name = $_POST['task_name'];
    $deadline = $_POST['deadline'];
<<<<<<< HEAD
    
    $student_id = $_SESSION['student_id'];
    
    $query = "INSERT INTO `tbl_tasklist`(`student_id`, `task_course`, `task_name`, `deadline`) VALUES ('$student_id', '$task_course', '$task_name', '$deadline')";
    $query_result = mysqli_query($con, $query);

=======
    $priority = $_POST['priority'];

    $student_id = $_SESSION['student_id'];

    $query = "INSERT INTO `tbl_tasklist`(`student_id`, `task_course`, `task_name`, `deadline`, `priority`) VALUES ('$student_id', '$task_course', '$task_name', '$deadline', '$priority')";
    $query_result = mysqli_query($con, $query);

>>>>>>> c885d8783d0cbcdcdb17ff6657a6472331994d9c
    if ($query_result) {
        $_SESSION['status'] = "Data is Added!";
        $_SESSION['status_code'] = "success";
        header("Location: index.php");
        exit();
    }
}

if (isset($_POST["update"])) {
    $id = $_POST['id'];
    $task_course = $_POST['task_course'];
    $task_name = $_POST['task_name'];
    $deadline = $_POST['deadline'];
    $priority = $_POST['priority']; // Added priority input

<<<<<<< HEAD
    $query = "UPDATE `tbl_tasklist` SET `task_course`='$task_course', `task_name`='$task_name', `deadline`='$deadline' WHERE `id` ='$id'";
    $query_result = mysqli_query($con, $query);

=======
    $query = "UPDATE `tbl_tasklist` SET `task_course`='$task_course', `task_name`='$task_name', `deadline`='$deadline', `priority`='$priority' WHERE `id` ='$id'";

    $query_result = mysqli_query($con, $query);

>>>>>>> c885d8783d0cbcdcdb17ff6657a6472331994d9c
    if ($query_result) {
        $_SESSION['status'] = "Data is Updated!";
        $_SESSION['status_code'] = "success";
        header("Location: index.php");
        exit();
    } else {
        $_SESSION['status'] = "Update Failed";
        $_SESSION['status_code'] = "error";
        header("Location: index.php");
        exit();
    }
}

if (isset($_POST["delete"])) {
<<<<<<< HEAD
    $id = $_POST['id'];

    $query = "DELETE FROM `tbl_tasklist` WHERE id = $id";
    $query_result = mysqli_query($con, $query);

=======

    $id = $_POST['id'];

    $query = "DELETE FROM `tbl_tasklist` WHERE id = $id";

    $query_result = mysqli_query($con, $query);

>>>>>>> c885d8783d0cbcdcdb17ff6657a6472331994d9c
    if ($query_result) {
        $_SESSION['status'] = "Task Deleted Successfully";
        $_SESSION['status_code'] = "success";
        header("Location: index.php");
        exit();
    } else {
        $_SESSION['status'] = "Delete Failed";
        $_SESSION['status_code'] = "error";
        header("Location: index.php");
        exit();
    }
}

if (isset($_POST["backButton"])) {
    header("Location: index.php");
    exit();
}
?>
