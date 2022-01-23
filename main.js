dhinka_song="";
party_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_name = "";
song_dhinka= "";
song_party = "";


function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    dhinka_song = loadSound("Dhinka Chika.mp3");
    party_song = loadSound("Abhi Toh Party Shuru Hui Hai.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_dhinka = dhinka_song.isPlaying();
    console.log(song_dhinka);

    song_party = party_song.isPlaying();
    console.log(song_party);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        party_song.stop();
        if(song_dhinka == false){
            dhinka_song.play();
        }
        else{
            console.log("Song Name: Dhinka Chinka Song");
            document.getElementById("song_id").innerHTML = "Song Name: Dhinka Chinka Song";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        dhinka_song.stop();
        if(song_party == false){
            party_song.play();
        }
        else{
            console.log("Song Name: Abhi toh party shuru hoi hai Song");
            document.getElementById("song_id").innerHTML = "Song Name: Abhi toh party shuru hoi hai Song";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}