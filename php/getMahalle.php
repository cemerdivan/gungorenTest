<?php
	
	include('connection.php');
	
	$array=array();//json için dizi tanimladik
	
	 $sql =<<<EOF
      SELECT ST_AsText(geom),mahalle_ad from mahalle;
EOF;

   $ret = pg_query($db, $sql);

   if(!$ret){
   //   echo pg_last_error($db);
      exit;
   } 
   $i=0;
  // echo "<br>";
     while($row = pg_fetch_row($ret)){
   
       $array[$i]['geom']=$row[0];
	   $array[$i]['mahalle']=$row[1];
	  $i=$i+1;
	  
	   }
  
	 
	echo  json_encode($array);
  
  

?>