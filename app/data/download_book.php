<?
    $id=$_POST['id'];

	// function: convert data to file
	function dataToFile($fileData, $fileName, $filePath) {
	  if ($fileName && $fileData) {
		$saveFile = $filePath . $fileName;
		$unescaped = pg_unescape_bytea($fileData);
		file_put_contents($saveFile, $unescaped, LOCK_EX);
	  }
	  else $fileName = "";
	  return $fileName;
	}

    // function - get connection params
    function get_db_params($file) {
        return json_decode(file_get_contents($file), true);
    }

    // connection params
    $db_params = get_db_params('db_params.json');
	$host = $db_params['host'];
	$user = $db_params['user'];
	$pass = $db_params['pass'];
	$db = $db_params['db'];

	// connect db
	$connection = pg_connect("host=$host dbname=$db user=$user password=$pass");
	if (!$connection) {
	    die("Could not open connection to database server");
	}

	$query = "SELECT b.id, b.file_type, b.binary_data
			  FROM book b
		      WHERE b.id = $id ";

	$result = pg_query($connection, $query) or die("Error in query: $query." . pg_last_error($connection));
	$fileName = pg_fetch_result($result, 'file_type');
	$fileData = pg_fetch_result($result, 'binary_data');

	$fileName = dataToFile($fileData, $fileName, './');

	$resResponse = '{ "success" : "true", "fileName" : "' . $fileName .'"}';

	echo $resResponse;

	pg_close($connection);
?>