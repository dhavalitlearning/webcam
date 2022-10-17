<?php

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="mystyle.css">
    <script src="../js/webcam2.js"></script>
    <script src="../js/webcam3.js"></script>
</head>

<body>
    <div class="contentarea">
        <h1>MDN - navigator.mediaDevices.getUserMedia(): Still photo capture demo</h1>

        <div class="camera">
            <video id="video">Video stream not available.</video>
            <button id="startbutton">Take photo</button>
        </div>
        <canvas id="canvas"> </canvas>
        <div class="output">
            <img id="photo" alt="The screen capture will appear in this box." />
        </div>
        <div class="camera2">
            <video id="video2">Video stream not available.</video>
            <button id="startbutton2">Take photo</button>
        </div>
        <canvas id="canvas2"> </canvas>
        <div class="output2">
            <img id="photo2" alt="The screen capture will appear in this box." />
        </div>

    </div>



</body>

</html>