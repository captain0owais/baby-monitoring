
STATUS = "";
objects = [];
alarm = "";

function preload(){
    alarm = loadSound('best_alarm.mp3');
}

function setup(){
    canvas = createCanvas(500 , 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "STATUS : DETECTING OBJECTS";
}

function modelLoaded(){
    console.log("cocossd INITIALIZED");
    STATUS = true;
}

function gotResult(error , result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
        objects = result;
    }
}

function draw(){
    image( video , 0 , 0 , canvas.width , canvas.height);

    if(objects.length == 0){
        alarm.play();
    }

    if(STATUS != ""){

        objectDetector.detect(video , gotResult);

        for(i = 0; i < objects.length; i++){

            document.getElementById("status").innerHTML = "STATUS : OBJECTS DETECTED";

                        
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        

            if(objects[i].label != "person"){
                console.log("playing ALARM");
                alarm.play();
                document.getElementById("no_objects").innerHTML = "BABY NOT FOUND ";
            }else{
                console.log("stoped ALARM");
                alarm.stop();
                document.getElementById("no_objects").innerHTML = "BABY FOUND";
            }
    
        }   
    }
}

