  <?php session_start(); ?>
  <?php include("config.php"); ?>

  <!doctype html>
  <html lang="en">
  <head>
<<<<<<< HEAD
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="login.css">
=======
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Login</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
      <link rel="stylesheet" href="login.css">
>>>>>>> c885d8783d0cbcdcdb17ff6657a6472331994d9c
  </head>
  <body>

  <section class="vh-100">
<<<<<<< HEAD
  <div class="container-fluid h-0">
    <div class="row d-flex justify-content-center align-items-center h-10">
      <div class="col-md-9 col-lg-6 col-xl-5">
      <img src="./img/tower.jpg" width="600" height="600" alt="Tower Image">

      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form action="process.php" method="POST" autocomplete="off">

          <!-- Email input -->
          <div class="form-outline mb-1">
          <label class="form-label fw-bold" for="form3Example3"style="color: #1a1851;font-size: 12px;">Student ID</label>
            <input type="text" id="form3Example3" class="form-control form-control-lg"
              placeholder="Enter student ID"  name="student_id" required style="width: 400px; height: 30px; font-size: 12px; ">
          </div>

          <!-- Password input -->
          <div class="form-outline mb-3">
          <label class="form-label fw-bold" for="form3Example4"style="color: #1a1851;font-size: 12px;">Password</label>
            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="Enter password" name="password" required style="width: 400px; height: 30px; font-size: 12px;">
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <!-- Checkbox -->
            <div class="form-check mb-0">
              <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" style="color: #1a1851;">
              <label class="form-check-label" for="form2Example3" style="color: #1a1851;font-size: 15px;">
                  Remember me
              </label>
          </div>



            <a href="#!" class="text-body" style="color: #1a1851;font-size: 15px;">Forgot password?</a>
          </div>

          <div class="text-center text-lg-start mt-4 pt-0">
            <button type="submit" class="btn btn-primary btn-lg fw-bold" name="loginButton"
              style="padding-left: 2.5rem; padding-right: 2.5rem; background-color: #fcb651; color: #1a1851; font-size: 12px; height: 35px; width: 150px; border-color: #fcb651;">LOG IN</button>
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="register.php"
                class="link-danger">Register</a></p>
          </div>
=======
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img src="./img/test1.jpg" class="img-fluid" alt="">
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form action="process.php" method="POST" autocomplete="off">

            <!-- Student ID input -->
            <div class="form-outline mb-4">
              <label class="form-label" for="form3Example3">Student ID</label>
              <input type="text" id="form3Example3" class="form-control form-control-lg" placeholder="Enter your student id"  name="student_id" required>
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <label class="form-label" for="form3Example4">Password</label>
              <input type="password" id="form3Example4" class="form-control form-control-lg" placeholder="Enter password" name="password" required>
            </div>
>>>>>>> c885d8783d0cbcdcdb17ff6657a6472331994d9c

            <div class="d-flex justify-content-between align-items-center">
              <!-- Checkbox -->
              <div class="form-check mb-0">
                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3">
                <label class="form-check-label" for="form2Example3">
                  Remember me
                </label>
              </div>
              <a href="#!" class="text-body">Forgot password?</a>
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
              <button type="submit" class="btn btn-primary btn-lg" name="loginButton" style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
              <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="register.php" class="link-danger">Register</a></p>
            </div>

          </form>
        </div>
      </div>
    </div>
  </section>

  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>

  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

  <?php
  if (isset($_SESSION['status']) && $_SESSION['status_code'] != '' ) {
      ?>
      <script>
          swal({
              title: "<?php echo $_SESSION['status']; ?>",
              icon: "<?php echo $_SESSION['status_code']; ?>",
          });
      </script> 
      <?php
      unset($_SESSION['status']);
      unset($_SESSION['status_code']);
  }

  if (isset($_POST["loginButton"])) {
      $student_id = $_POST['student_id'];
      $password = $_POST['password'];

      $login_query = "SELECT `student_id`, `password`, `firstname`, `middlename`, `lastname` FROM `tbl_users` WHERE `student_id` = '$student_id' AND `password` = '$password' LIMIT 1 ";
      $login_result = mysqli_query($con, $login_query);

      if ($login_result && mysqli_num_rows($login_result) == 1) {
          $user = mysqli_fetch_assoc($login_result);
          $_SESSION['loggedin'] = true;
          $_SESSION['student_id'] = $student_id;
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
  ?>

<<<<<<< HEAD
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<?php
if (isset($_SESSION['status']) && $_SESSION['status_code'] != '' )
{
    ?>
        <script>
            swal({
                title: "<?php echo $_SESSION['status']; ?>",
                icon: "<?php echo $_SESSION['status_code']; ?>",
            });
        </script> 
        <?php
        unset($_SESSION['status']);
        unset($_SESSION['status_code']);
}

if (mysqli_num_rows($login_result) == 1) {
  $user = mysqli_fetch_assoc($login_result);
  $_SESSION['loggedin'] = true;
  $_SESSION['student_id'] = $user['student_id']; // Store student_id in session
  $_SESSION['firstname'] = $user['firstname'];
  $_SESSION['middlename'] = $user['middlename'];
  $_SESSION['lastname'] = $user['lastname'];
  $_SESSION['status'] = "Welcome!";
  $_SESSION['status_code'] = "success";
  header("Location: index.php");
  exit();
}


?>

=======
>>>>>>> c885d8783d0cbcdcdb17ff6657a6472331994d9c
  </body>
  </html>
