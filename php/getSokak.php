<?php
	
	include('connection.php');
	
	$array=array();//json için dizi tanimladik
	$mahalle=$_POST["mahalle"];
	//echo json_encode($mahalle);
	$sql ="SELECT ST_AsText(geom),yol_ismi from yol where mahalle_ad='$mahalle'";

    $ret = pg_query($db, $sql);

    if(!$ret){
		exit;
	}
	
    $i=0;
	while($row = pg_fetch_row($ret))
	{
		$array[$i]['geom']=$row[0];
		$array[$i]['yol_ismi']=$row[1];
		$i=$i+1;
	} 
	 
	echo  json_encode($array);

?>