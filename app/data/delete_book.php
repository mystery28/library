<?
    $id=$_POST['id'];

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

	$query = "BEGIN WORK";
	$result = pg_query($connection, $query) or die("Error in query: $query." . pg_last_error($connection));

	$query = "DELETE FROM book_technology WHERE book_id = $id";
    $result = pg_query($connection, $query) or die("Error in query: $query." . pg_last_error($connection));

	$query = "DELETE FROM book WHERE id = $id";
	$result = pg_query($connection, $query) or die("Error in query: $query." . pg_last_error($connection));

	$query = "COMMIT";
	$result = pg_query($connection, $query) or die("Error in query: $query." . pg_last_error($connection));

    $message = "Book is delete";

	$resResponse = '{ "success" : "true", "message" : "' . $message . '"}';

	echo $resResponse;

	pg_close($connection);
?>