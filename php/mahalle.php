<?php
	
	include('connection.php');
	
	$array=array();//json için dizi tanimladik
	
	$Gelen_Mahalle_Ad    =  "TOZKOPARAN";//$_POST['adi'];
//$Gelen_Mahalle_Ad    = "TOZKOPARAN";
	 $sql =<<<EOF
      SELECT ST_AsText(geom) from mahalle where mahalle_ad= '${Gelen_Mahalle_Ad}' ;
	  
EOF;

   $ret = pg_query($db, $sql);

   if(!$ret){
   //   echo pg_last_error($db);
      exit;
   } 
  // echo "<br>";
   while($row = pg_fetch_row($ret)){
   
      $array['a']=$row[0] ;
	  
	   }
  
	 
	echo  json_encode($array);

?>