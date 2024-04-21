<?php
session_start();    
include("config.php");

if(isset($_POST["registerButton"])){

    $email = $_POST['email'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $task_name = $_POST['task_name'];
    $mname = isset($_POST['mname']) ? $_POST['mname'] : '' ;
    $lname = $_POST['lname'];

    $check_email_query = "SELECT * FROM `user` WHERE `email` = '$email'";
    $email_result = mysqli_query($con,$check_email_query);
    $email_count = mysqli_fetch_array($email_result)[0];

    if($email_count > 0){
        $_SESSION['status'] = "Email address already taken";
        $_SESSION['status_code'] = "error";
        header("Location: register.php");
        exit();
    }

    if ($password !== $repassword){
        $_SESSION['status'] = "Password does not match";
        $_SESSION['status_code'] = "error";
        header("Location: register.php");
        exit();
    }


    $query = "INSERT INTO `user`(`email`, `password`, `fname`, `mname`, `lname`) VALUES ('$email','$password','$fname','$mname','$lname')";
    $query_result = mysqli_query( $con, $query );

    if($query_result){
        $_SESSION['status'] = "Registration Sucess!";
        $_SESSION['status_code'] = "success";
        header("Location: login.php");
        exit();
    }
}


if(isset($_POST["loginButton"])){

    $email = $_POST['email'];
    $password = $_POST['password'];

    $login_query = "SELECT `id`, `email`, `password`, `fname`, `mname`, `lname` FROM `user` WHERE `email` = '$email' AND `password` = '$password' LIMIT 1 ";
    $login_result = mysqli_query($con, $login_query);

    if(mysqli_num_rows($login_result) == 1){
            $_SESSION['status'] = "Welcome!";
            $_SESSION['status_code'] = "success";
            header("Location: index.php");
            exit();
    }else{
        $_SESSION['status'] = "Invalid Username/Password";
        $_SESSION['status_code'] = "error";
        header("Location: login.php");
        exit();
    }
}

if(isset($_POST["submitButton"])){

    $task_course = $_POST['task_course'];
    $task_name = $_POST['task_name'];
    $deadline = $_POST['deadline'];

    $query = "INSERT INTO `tbl_tasklist`(`task_course`, `task_name`,`deadline`) VALUES ('$task_course','$task_name', '$deadline')";
    $query_result = mysqli_query( $con, $query );

    if($query_result){  
        $_SESSION['status'] = "Data is Added!";
        $_SESSION['status_code'] = "success";
        header("Location: index.php");
        exit();
    }
}


if(isset($_POST["update"])){

    $id = $_POST['id'];
    $task_course = $_POST['task_course'];
    $task_name = $_POST['task_name'];
    $deadline = $_POST['deadline'];


    $query = "UPDATE `tbl_tasklist` SET `task_course`='$task_course',`task_name`='$task_name', `deadline`='$deadline' WHERE `id` ='$id'";
    
    $query_result = mysqli_query( $con, $query );

    if($query_result){
        $_SESSION['status'] = "Data is Updated!";
        $_SESSION['status_code'] = "success";
        header("Location: index.php");  
        exit();
    }else{
        $_SESSION['status'] = "Update Failed";
        $_SESSION['status_code'] = "error";
        header("Location: index.php");
        exit();
    }
}

if(isset($_POST["delete"])){

    $id = $_POST['id'];

    $query = "DELETE FROM `tbl_tasklist` WHERE id = $id";
    
    $query_result = mysqli_query( $con, $query );

    if($query_result){
        $_SESSION['status'] = "UWU BABYE";
        $_SESSION['status_code'] = "success";
        header("Location: index.php");
        exit();
    }else{
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