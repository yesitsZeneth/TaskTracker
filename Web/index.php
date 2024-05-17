<?php 
session_start();
include ("config.php");

if (!isset($_SESSION['loggedin'])) {
    header('Location: login.php');
    exit();
}

$student_id = $_SESSION['student_id']; // Get the student_id of the logged-in user
$firstname = $_SESSION['firstname'];
$middlename = $_SESSION['middlename'];
$lastname = $_SESSION['lastname'];

// Fetch profile picture URL for the logged-in user
$query = "SELECT `image` FROM `tbl_users` WHERE `student_id` = '$student_id'";
$result = mysqli_query($con, $query);
$row = mysqli_fetch_assoc($result);
$image = $row['image'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Tracker</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="index.css">
    <style>
        .user-profile {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        .user-profile img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-left: 10px;
            cursor: pointer; /* Add cursor pointer for better UX */
        }
        .user-profile h5 {
            margin-bottom: 0;
            margin-left: 10px;
        }
        .dropdown-menu {
            display: none; /* Initially hide dropdown menu */
        }
        .dropdown-visible {
            display: block !important;
        }
        .right-button {
            position: absolute;
            top: 120px;
            right: 10px;
        }
        .right-button {
            position: absolute;
            top: 140px;
            right: 10px;
            width: 150px;
            color: #1a1851;
        }

    </style>
</head>
<body style="background-color: #eee; background-image: url('./img/tower.jpg'); background-size: cover; background-position: center; background-attachment: fixed; height: 100%;">

<div class="container-fluid mt-4">
    <section class="section ">
        <div class="row ">
            <div class="col-lg-12">
                <div class="card  ">
                    <div class="card-body">
                        <div class="row ">
                            <div class="col">
                                <div class="card-body1">
                                <h5 class="card-title1 flex-row fw-bold" style="display: flex; justify-content: left; margin-left: 50px;">
                                    <span style="color: #fcb651; font-size: 65px;">Task</span> 
                                    <span style="color: #1a1851; font-size: 65px;">Tracker</span>
                                </h5>
                                </div>
                            </div>
                            <div class="col flex-row" style="display: flex; justify-content: right;">
                                <div class="user-profile">
                                <img src="<?php echo $image ? $image : 'img/pfp.jpg'; ?>" 
                                    title="<?php echo $firstname . ' ' . $middlename . ' ' . $lastname; ?>" 
                                    alt="<?php echo $firstname . ' ' . $middlename . ' ' . $lastname; ?>" 
                                    onclick="toggleDropdown()" 
                                    style="width: 75px; height: auto;">
>
                                    <h5 class="card-title2 fw-bold" style="color: #1a1851; font-size: 25px;"><?php echo "$firstname $middlename $lastname"?></h5>
                                    <div id="dropdownContainer" class="dropdown-menu" style="background-color: #fcb651">
                                        <ul class="proflogout mt-3 ">
                                            <li class="prof fw-bold"><a href="#" style="color: #1a1851; font-size: 20px;">Profile</a></li>
                                            <li class="logout fw-bold"><a href="logout.php" style="color: #1a1851; font-size: 20px;">Logout</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <a href="insert.php" class="btn btn-primary right-button fw-bold" style="background-color: #1a1851; color: #FFFF; font-size: 23px; height: 50px; width: 300px;">Add Task</a>
                    <!-- Table with stripped rows -->
                    <table class="table datatable">
                        <!-- Table body content -->
                    </table>
                    <!-- End Table with stripped rows -->
                </div>
            </div>
        </div>
    </div>
</section>
</div>

<script>
    function toggleDropdown() {
        var dropdownContainer = document.getElementById("dropdownContainer");
        dropdownContainer.classList.toggle("dropdown-visible");
    }
</script>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>

<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

</body>
</html>
