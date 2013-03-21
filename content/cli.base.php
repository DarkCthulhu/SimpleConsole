<?php
/*
 *  Project: cli
 *  Author: DarkCthulhu
 *  License: MIT
 */
 
/*
 * Class to handle all interaction with cli at the back-end 
 * Functions handle an input command via POST
 */
 

    class cli {
        private $allowed_cmds;
        //constructor
        function __construct($allowed_cmds) {
            $this->allowed_cmds = $allowed_cmds;
        }
        //destructor
        function __destruct() {

        }
        //exec
        function execute($command){
            $command = $this->makesafe($command);
            return system($command);
        }
        //check if command is safe
        function makesafe($command){
            $command = trim($command);
            $actual_command = "default_cmd";
            if(isset($this->allowed_cmds[$command])){
                $actual_command = $this->allowed_cmds[$command];
            }
            return $actual_command;
        }
        function navigate($dir){
            return chdir($dir);
        }
    }
?>