<?php
    include_once('cli.base.php');
    
    //allowed commands
    $cmds = array(
        "ls" => "ls -al",
        "ls -t" => "ls -ltr",
    );
    if(isset($_GET['cmd'])){
        $cmd = trim($_GET['cmd']);
        $cli = new cli($cmds);
        echo $cli->execute($cmd);
    }
?>
