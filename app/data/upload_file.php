<?
    // post data
	$uploadfile = "./".basename($_FILES['file']['name']);

	if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
	  $result = "true";
	}
	else {
	  $result = "false";
	}

    echo '{ "success": "' . $result . '", "file": "' . $_FILES['file']['name'] . '" }';
?>
