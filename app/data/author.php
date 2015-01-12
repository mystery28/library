<?
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

    $query = "SELECT a.id, a.name FROM author a";
	$result = pg_query($connection, $query) or die("Error in query: $query." . pg_last_error($connection));
	$rows = pg_num_rows($result);
	if ($rows > 0) {
	    for ($i=0, $j=0; $i<$rows; $i++, $j++) {
		    $row = pg_fetch_object($result, $i);
		    $exResult[$j] = $row;
	    }
	}

    $resResponse = json_encode($exResult);

	$resResponse = '{ "success" : "true", "author" : ' . $resResponse .'}';

	echo $resResponse;

	pg_close($connection);
?>