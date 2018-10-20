<!DOCTYPE html>
<html>
<style>
    body {font-family: Arial, Helvetica, sans-serif;}

    form {
        border: 3px solid #f1f1f1;
        font-family: Arial;
        color: #FF4500;
    }

    .container {
        padding: 10px;
        background-color: #f1f1f1;
    }

    input[type=text], input[type=submit] {
        width: 100%;
        padding: 10px;
        margin: 5px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }

    input[type=checkbox] {
        margin-top: 16px;
    }

    input[type=submit] {
        background-color: #4CAF50;
        color: white;
        border: none;
    }

    input[type=submit]:hover {
        opacity: 0.8;
    }
</style>
<body>




<form action="" method = post>
    <div class="container">
        <h2>Fire alert signup</h2>
        <p>Sign up to be notified about fire alerts near you!</p>
    </div>

    <div class="container" style="background-color:white">
        <input type="text" placeholder="Name" name="name" required>
        <input type="text" placeholder="Email address" name="mail" required>
        <input type="text" placeholder="Phone number" name="number" required>
    </div>

    <div class="container">
        <input type="submit" value="Subscribe" onclick=getLocation()>
    </div>
</form>

</body>
</html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
    $(document).ready(function(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getLocation);
        }else{
            $('#location').html('This browser does not support geolocation. \n Please use a browser other than OperaMini and Internet Explorer older than version 10.');
        }
    });

    function getLocation(position){
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        $.ajax({
            type:'POST',
            //url:'getLocation.php',
            //data:'latitude='+latitude+'&longitude='+longitude,
            success:function(msg){
                if(msg){
                    $("#location").html(msg);
                }else{
                    $("#location").html('Not Available');
                }
            }
        });
    }
</script>


<%--<!DOCTYPE html>--%>
<%--<html>--%>
<%--<style>--%>
<%--body {font-family: Arial, Helvetica, sans-serif;}--%>

<%--form {--%>
<%--border: 3px solid #FF4500;--%>
<%--font-family: Arial;--%>
<%--}--%>

<%--.container {--%>
<%--padding: 10px;--%>
<%--background-color: #FF4500;--%>
<%--}--%>

<%--input[type=text], input[type=submit] {--%>
<%--width: 100%;--%>
<%--padding: 10px;--%>
<%--margin: 5px 0;--%>
<%--display: inline-block;--%>
<%--border: 1px solid #ccc;--%>
<%--box-sizing: border-box;--%>
<%--}--%>

<%--input[type=checkbox] {--%>
<%--margin-top: 16px;--%>
<%--}--%>

<%--input[type=submit] {--%>
<%--background-color: #ffffff;--%>
<%--color: #FF4500;--%>
<%--border: none;--%>
<%--}--%>

<%--input[type=submit]:hover {--%>
<%--opacity: 0.8;--%>
<%--}--%>
<%--</style>--%>
<%--<body>--%>




<%--<form action="" method="post">--%>
<%--<div class="container">--%>
<%--<h2>Fire alert signup</h2>--%>
<%--<p>Sign up to be notified about fire alerts near you!</p>--%>
<%--</div>--%>

<%--<div class="container" style="background-color:white">--%>
<%--<input type="text" placeholder="Name" id="name" name="name" required>--%>
<%--<input type="text" placeholder="Email address" id="mail" name="mail" required>--%>
<%--<input type="text" placeholder="Phone number" id="number" name="number" required>--%>
<%--</div>--%>

<%--<div class="container">--%>
<%--<input type="submit" value="Subscribe" onclick = getLocation()>--%>
<%--</div>--%>
<%--</form>--%>

<%--</body>--%>
<%--</html>--%>

<%--<script>--%>
<%--var x = document.getElementById("location");--%>
<%--function getLocation() {--%>
<%--if (navigator.geolocation) {--%>
<%--x.innerText = "works";--%>
<%--//navigator.geolocation.getCurrentPosition(sendToServer);--%>
<%--} else {--%>
<%--x.innerHTML = "This browser does not support geolocation. \\n Please use a browser other than OperaMini and Internet Explorer older than version 10.";--%>
<%--}--%>
<%--}--%>
<%--// function sendToServer(){--%>
<%--//     var pos;--%>
<%--//     pos = position;--%>
<%--//     x.getElementById('latitude').innerHTML = pos.coords.latitude;--%>
<%--//     x.getElementById('longitude').innerHTML = pos.coords.longitude;--%>
<%--//     x.innerHTML = "works";--%>
<%--// }--%>
<%--</script>--%>


