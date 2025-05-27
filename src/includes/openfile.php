<?php 
 
$dbservername = 'localhost';
$dbusername = 'uy32hp2gce6t3';
$dbpassword = 'a7wxwt3asg3e';
$dbname = "dbscnrqy755s5p";


$serial = $_POST["SerialNumber"];
$model = $_POST["Model"];
$username = $_POST["Username"];
$useremail = $_POST["Useremail"];
$access_level = $_POST["AccessLevel"];
$filename = $_POST["FileName"];
$ip_address = "";
$user_agent = "";

$action = $_POST['ActionInput'];



//Get IP address
if(!empty($_SERVER['HTTP_CLIENT_IP'])){
  //ip from share internet
     $ip_address = $_SERVER['HTTP_CLIENT_IP'];
}elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
  //ip pass from proxy
    $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
}else{
        $ip_address = $_SERVER['REMOTE_ADDR'];
}

//get agent info
$user_agent = $_SERVER['HTTP_USER_AGENT'];



// Create connection to database
//$conn = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);
// Check connection
//if ($conn->connect_error) {
//  die("Connection failed: " . $conn->connect_error);
//}

//$sql = "INSERT INTO ecompass_usr_stats ". "(timestamp,serial,model,username,user_email,access_level,ip_address,user_agent,action,filename) ". "VALUES(NOW(),'$serial','$model','$username','$useremail','$access_level','$ip_address','$user_agent','$action','$filename')";

//if ($conn->query($sql) === TRUE) {
	header('Location: ../editor.php');
//} else {
//  echo "Error: " . $sql . "<br>" . $conn->error;
//}

//$conn->close();

?>