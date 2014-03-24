<?php
	
	include('connection.php');
	
	$array=array();//json için dizi tanimladik
	$mahalle=$_POST["mahalle"];
	$sokak=$_POST["sokak"];
	 $sql ="SELECT ST_AsText(geom),kapi_no from kapino where (mahalle_ad='$mahalle' and yol_adi='$sokak')";

   $ret = pg_query($db, $sql);
   if(!$ret){
   //   echo pg_last_error($db);
      exit;
   } 
   $i=0;
  // echo "<br>";
     while($row = pg_fetch_row($ret)){
   
       $array[$i]['geom']=$row[0];
	   $array[$i]['kapi_no']=$row[1];
	  $i=$i+1;
	  
	   }
  
	 
	echo  json_encode($array);
  
  

?>