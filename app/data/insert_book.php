<?
    $id=$_POST['id'];
    $title=$_POST['title'];
    $publisher_id=$_POST['publisher_id'];
    $author_id=$_POST['author_id'];
    $technology_id=json_decode($_POST['technology_id']);
    $description=$_POST['description'];
    $file_type=$_POST['file_type'];

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

	// function: convert file to data
	function fileToData($fileName, $filePath) {
	  $fileSave = $filePath . $fileName;
	  $escaped = '';
		if ($fileName && file_exists($fileSave)) {
		  $binaryData = file_get_contents($fileSave);
		  if ($binaryData)
		    $escaped = pg_escape_bytea($binaryData);
		  unlink($fileSave);
		}
	  return $escaped;
	}

	// connect db
	$connection = pg_connect("host=$host dbname=$db user=$user password=$pass");
	if (!$connection) {
	    die("Could not open connection to database server");
	}

	$query = "BEGIN WORK";
	$result = pg_query($connection, $query) or die("Error in query: $query." . pg_last_error($connection));

	$query = "select nextval('book_id_new') as id";
	$result = pg_query($connection, $query) or die("Error in query: $query." . pg_last_error($connection));
	$id = pg_fetch_result($result, 'id');

	$escaped = fileToData($file_type, './');
	$file_type = str_replace(" ","_",$file_type);

	$query = "INSERT INTO book(id, title, publisher_id, author_id, description, file_type, binary_data)
			  VALUES($id, '$title', $publisher_id, $author_id, '$description', '$file_type', '$escaped')";
	$result = pg_query($connection, $query) or die("Error in query: $query." . pg_last_error($connection));

	for ($i = 0, $size = count($technology_id); $i < $size; $i++) {
	    $tech_id = $technology_id[$i];
		$query = "INSERT INTO book_technology (book_id, technology_id)
				  VALUES ($id, $tech_id)";
		$result = pg_query($connection, $query) or die("Error in query: $query." . pg_last_error($connection));
	}

	$query = "COMMIT";
	$result = pg_query($connection, $query) or die("Error in query: $query." . pg_last_error($connection));

    $message = "Book: $id. $title is create";

	$resResponse = '{ "success" : "true", "message" : "' . $message . '"}';

	echo $resResponse;

	pg_close($connection);
?>