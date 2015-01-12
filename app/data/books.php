<?
    $limit=$_GET['limit'];
    $page=$_GET['page'];
    $start=$_GET['start'];
    $sort=$_GET['sort'];

    $publisher=$_GET['publisher'];
    $author=$_GET['author'];
    $technology=$_GET['technology'];
    $titleSearch=$_GET['titleSearch'];

    $sort = json_decode($sort);
    $property = $sort[0]->property;
    $direction = $sort[0]->direction;

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

	function get_technology_array($connection, $book_id) {
	    $lquery = "select b.technology_id from book_technology b where b.book_id = $book_id";
	    $lresult = pg_query($connection, $lquery) or die("Error in query: $query." . pg_last_error($connection));
	    $lrows = pg_num_rows($lresult);
	    if ($lrows > 0) {
	        for ($j=0; $j<$lrows; $j++) {
		        $lrow = pg_fetch_row($lresult, $j);
		        $outresult[$j] = $lrow[0];
	        }
	        return $outresult;
	    }
	}

	// connect db
	$connection = pg_connect("host=$host dbname=$db user=$user password=$pass");
	if (!$connection) {
	    die("Could not open connection to database server");
	}

    // query_where
    if ($author || $publisher || $technology || $titleSearch) {
	    $query_pref =  " WHERE";
	    if ($author) {
	        $query_where.=  $query_pref . " b.author_id = $author";
	        $query_pref =  " AND";
	    }
	    if ($publisher) {
	        $query_where.=  $query_pref . " b.publisher_id = $publisher";
	        $query_pref =  " AND";
        }
	    if ($technology) {
	        $query_where.= $query_pref." EXISTS (SELECT *
	                                             FROM book_technology bt
	                                             WHERE bt.book_id=b.id
	                                             AND bt.technology_id IN ($technology))";
	        $query_pref =  " AND";
	    }
	    if ($titleSearch) {
	        $query_where.=  $query_pref . " UPPER(b.title) LIKE UPPER('%$titleSearch%')";
	        $query_pref =  " AND";
        }
	}

    $query = "SELECT b.id FROM book b $query_where";
	$result = pg_query($connection, $query) or die("Error in query: $query." . pg_last_error($connection));
	$results = pg_num_rows($result);

	$query = "SELECT b.id, b.title, b.publisher_id, p.name as publisher_name, b.author_id, a.name as author_name, b.description, b.file_type
			  FROM book b
			  INNER JOIN publisher p ON p.id = b.publisher_id
			  INNER JOIN author a ON a.id = b.author_id";
	$query.= $query_where;
	if ($property)
	    $query.= " ORDER BY $property $direction";
	if ($limit)
	    $query.= " LIMIT $limit";
	if ($start)
	    $query.= " OFFSET $start";

	$result = pg_query($connection, $query) or die("Error in query: $query." . pg_last_error($connection));
	$rows = pg_num_rows($result);
	if ($rows > 0) {
	    for ($i=0; $i<$rows; $i++) {
		    $row = pg_fetch_object($result, $i);
		    $row->technology_id = get_technology_array($connection, $row->id);
		    $exResult[$i] = $row;
	    }
	}

    $resResponse = json_encode($exResult);

	$resResponse = '{ "success" : "true", "results" : "' . $results . '", "books" : ' . $resResponse .'}';

	echo $resResponse;

	pg_close($connection);
?>