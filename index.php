<!DOCTYPE html>

<html lang="ja">

<head>
<meta charaset="utf-8">
<!--========== ▼ CSS ==========-->
<link rel="stylesheet" href="assets/css/style.css">
<!--========== ▲ CSS ==========-->

<!--========== ▼ JAVASCRIPT ==========-->
<script src="assets/js/jquery-2.1.4.min.js"></script>
    
<!-- ajax -->
<script src="assets/js/ajax.js" charaset="utf-8"></script>
<!--========== ▲ JAVASCRIPT ==========-->
</head>
<body>
<h1>
	アニメ一覧
</h1>
<?php 
	//年のプルダウンメニュー
	echo "<select name='year'>";
	for($y = 2014; $y <= date("Y"); $y++){
		echo "<option value=" .$y. ">" .$y. "</option>";
	}
	echo "</select>年";
	//クールのプルダウンメニュー
	echo "<select name='season'>";
	for($n = 1; $n <= 4; $n++){
		echo "<option value=" .$n. ">" .$n. "</option>";
	}
	echo "</select>期";
?>

<table id="anime">

</table>
</body>
</html>