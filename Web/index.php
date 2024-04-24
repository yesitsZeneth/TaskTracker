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

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container-fluid mt-4">
    <section class="section">
        <div class="row">
            <div class="col-lg-12">

                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <div class="card-body1">
                                    <h5 class="card-title1">Task Tracker</h5>
                                </div>
                            </div>
                            <div class="col">
                                <a href="logout.php" class="btn btn-danger" style="float: left;">Logout</a>
                                <img src="assets/profile.png" title="Emmanuelle James P. Duallo" alt="Emmanuelle James P. Duallo"
                                     style="width: 100px; height: 100px; object-fit: cover;">
                                <h5 class="card-title2"><?php echo "$firstname $middlename $lastname"; ?></h5>
                            </div>
                        </div>
                    </div>
                    <a href="insert.php" style="float: right;" class="btn btn-primary">Add Task</a>
                    <!-- Table with stripped rows -->
                    <table class="table datatable">
                        <thead class="trlist">
                        <tr>
                            <th class="col">Task Title</th>
                            <th class="col">Task Description</th>
                            <th class="col">Deadline</th>
                            <th class="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        <?php
                        $query = "SELECT * FROM `tbl_tasklist` WHERE `student_id` = '$student_id'"; // Modify the query to select tasks only for the logged-in user
                        $query_run = mysqli_query($con, $query);
                        if(mysqli_num_rows($query_run) > 0)
                        {
                            foreach($query_run as $row)
                            {
                                ?>
                                <tr  class="trlistsql">
                                    <td><?= $row['task_name']; ?></td>
                                    <td><b><?= $row['task_course']; ?></b></td>
                                    <td><?= $row['deadline']; ?></td>
                                    <td>

                                        <a type="button" class="btn btn-outline-primary" href="view.php?id=<?=$row['id'];?>">VIEW</a>
                                        <a type="button" class="btn btn-outline-warning" href="update.php?id=<?=$row['id'];?>">UPDATE</a>

                                        <form action="process.php" method="POST" style="display: inline;">
                                            <input type="hidden" name="id" value="<?= $row['id']; ?>">
                                            <button name="delete" type="submit" class="btn btn-outline-danger">DELETE</button>
                                        </form>
                                    </td>
                                </tr>

                                <?php
                            }
                        } else
                        {
                            ?>
                            <tr>
                                <td colspan="4">No Record Found</td>
                            </tr>
                            <?php
                        }
                        ?>

                        </tbody>
                    </table>
                    <!-- End Table with stripped rows -->

                </div>
            </div>

        </div>
    </div>
    </section>
</div>



<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>


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
?>
</body>
</html>