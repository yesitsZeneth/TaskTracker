<?php session_start(); ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Registration</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <style>
        /* Define styles for invalid inputs */
        .invalid {
            border-color: #dc3545 !important; /* Red border color for invalid input */
        }

        .error-message {
            color: #dc3545; /* Red color for error message */
            font-size: 0.875rem; /* Font size for error message */
            margin-top: 0.25rem; /* Margin top for error message */
        }

                /* Define styles for different password strengths */
        .weak-password {
            border-color: #dc3545 !important; /* Red border color for weak password */
        }

        .moderate-password {
            border-color: #ffc107 !important; /* Yellow border color for moderate password */
        }

        .strong-password {
            border-color: #28a745 !important; /* Green border color for strong password */
        }

    </style>
</head>
<body>

<section class="vh-100" style="background-color: #eee; background-image: url('./img/tower.jpg'); background-size: cover; background-position: center; background-attachment: fixed; height: 100%;">    
<div class="container h-25">
        <div class="row d-flex justify-content-center align-items-center h-5">
            <div class="col-lg-12 col-xl-11">
            <div class="card text-black mt-1 mb-1" style="border-radius: 10px; height: 98vh; width: 68vh;">
            <form class="mx-auto my-0 mx-md-0" action="process.php" method="POST" autocomplete="off" style="max-width: 400px;">
            <p class="text-center h1 fw-bold mb-0 mx-1 mx-md-0 mt-2 custom-mb" style="color: #fcb651; font-size: 20px;">SIGN UP</p>
                                <div class="d-flex flex-row align-items-center mb-0">
                                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                    <div class="form-outline flex-fill mb-0 mt-0">
                                        <label class="form-label fw-bold" for="form3Example3c" style="color: #1a1851;font-size: 12px;">Student ID</label>
                                        <input type="numbers" id="form3Example3c" class="form-control" name="student_id" required style="width: 350px; height: 30px">

                                    </div>
                                </div>
                                    <div class="d-flex flex-row align-items-center mb-0">
                                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0 mt-0">
                                            <label class="form-label fw-bold" for="form3Example4cd"style="color: #1a1851;font-size: 12px;">First Name</label>
                                            <input type="text" id="form3Example4cd" class="form-control" name="firstname" required style="width: 350px; height: 30px">
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row align-items-center mb-0">
                                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0 mt-0">
                                            <label class="form-label fw-bold" for="form3Example4cd"style="color: #1a1851;font-size: 12px;">Middle Name <small>(Optional)</small></label>
                                            <input type="text" id="form3Example4cd" class="form-control" name="middlename"required style="width: 350px; height: 30px">
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row align-items-center mb-0">
                                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0 mt-0">
                                            <label class="form-label fw-bold" for="form3Example4cd"style="color: #1a1851;font-size: 12px;">Last Name</label>
                                            <input type="text" id="form3Example4cd" class="form-control" name="lastname" required style="width: 350px; height: 30px">
                                        </div>
                                    </div>
                                    
                                    <div class="d-flex flex-row align-items-center mb-0">
                                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0 mt-0">
                                            <label class="form-label fw-bold" for="form3Example4cd"style="color: #1a1851;font-size: 12px;">Email</label>
                                            <input type="email" id="form3Example4cd" class="form-control" name="email" required style="width: 350px; height: 30px">
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row align-items-center mb-0">
                                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0 mt-0">
                                            <label class="form-label fw-bold" for="form3Example4c"style="color: #1a1851;font-size: 12px;">Password</label>
                                            <input type="password" id="form3Example4c" class="form-control" name="password" required style="width: 350px; height: 30px">
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row align-items-center mb-0">
                                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0 mt-0">
                                            <label class="form-label fw-bold" for="form3Example4cd"style="color: #1a1851;font-size: 12px;">Repeat password</label>
                                            <input type="password" id="form3Example4cd" class="form-control" name="repassword" required style="width: 350px; height: 30px">
                                        </div>
                                    </div>

                                    <div class="d-flex justify-content-center  mt-3 mx-4 mb-3 mb-lg-0">
                                    <button type="submit" class="btn btn-lg fw-bold" name="registerButton" style="background-color: #fcb651; color: #1a1851; font-size: 12px; height: 35px; width: 150px;">Register</button>

    </div>

    <div class="text-center justify-content-center text-lg-center mt-0 pt-2">
        <p class="small fw-bold justify-content-center  mt-2 pt-1 mb-0 mt-0 " style="color: #1a1851;font-size: 12px;">Already have an account? <a href="login.php" class="link-danger">Login</a></p>
    </div>

                                </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
    // Get references to the required input fields
    const requiredInputs = document.querySelectorAll('input[required]');
    
    // Get references to the input fields
    const studentIdInput = document.querySelector('input[name="student_id"]');
    const emailInput = document.querySelector('input[name="text"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const repasswordInput = document.querySelector('input[name="repassword"]');
    const firstNameInput = document.querySelector('input[name="firstname"]');
    const lastNameInput = document.querySelector('input[name="lastname"]');
    
    // Add event listener to check input validity on form submit
    document.querySelector('form').addEventListener('submit', (event) => {
        // Check all required input fields
        validateInput(studentIdInput);
        validateInput(emailInput);
        validateInput(firstNameInput);
        validateInput(lastNameInput);
        
        // Check password strength
        const passwordStrength = getPasswordStrength(passwordInput.value);
        
        // If password is weak, prevent form submission
        if (passwordStrength === 'weak') {
            passwordInput.classList.add('invalid');
            event.preventDefault();
            let errorMessage = passwordInput.parentNode.querySelector('.error-message');
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                passwordInput.parentNode.appendChild(errorMessage);
            }
            errorMessage.textContent = 'Password must be at least 8 characters long and contain at least one digit and one lowercase letter';
        } else {
            // If password is not weak, remove any error message
            passwordInput.classList.remove('invalid');
            const errorMessage = passwordInput.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }

        // Check if passwords match
        if (passwordInput.value !== repasswordInput.value) {
            passwordInput.classList.add('invalid');
            repasswordInput.classList.add('invalid');
            event.preventDefault();
            let errorMessage = repasswordInput.parentNode.querySelector('.error-message');
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                repasswordInput.parentNode.appendChild(errorMessage);
            }
            errorMessage.textContent = 'Passwords do not match';
        } else {
            passwordInput.classList.remove('invalid');
            repasswordInput.classList.remove('invalid');
            const errorMessage = repasswordInput.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
    });

    // Function to validate individual input fields
    function validateInput(input) {
        if (input.value.trim() === '') {
            input.classList.add('invalid');
            const errorMessage = document.createElement('div');
            errorMessage.textContent = `${input.previousElementSibling.textContent} is required`;
            errorMessage.classList.add('error-message');
            input.parentNode.appendChild(errorMessage);
        } else {
            input.classList.remove('invalid');
            const errorMessage = input.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
    }

    // Function to check password strength
    function getPasswordStrength(password) {
        const weakRegex = /^.{1,7}$/;
        const moderateRegex = /^(?=.*\d)(?=.*[a-z]).{8,}$/;
        const strongRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

        if (strongRegex.test(password)) {
            return 'strong';
        } else if (moderateRegex.test(password)) {
            return 'moderate';
        } else if (weakRegex.test(password)) {
            return 'weak';
        } else {
            return 'weak';
        }
    }
</script>



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