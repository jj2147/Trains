var config = {
    apiKey: "AIzaSyAzy2zM-83NikoNMUo7FydRNlGvUxxt4Fc",
    authDomain: "trains-d96e3.firebaseapp.com",
    databaseURL: "https://trains-d96e3.firebaseio.com",
    projectId: "trains-d96e3",
    storageBucket: "trains-d96e3.appspot.com",
    messagingSenderId: "1053977290468"
};
firebase.initializeApp(config);

var firebase = firebase.database();


$("#submit-btn").on("click", function(){
    var trainObj = {
        name: $("#train-name").val(),
        destination: $("#destination").val(),
        firstTrain: $("#first-train").val(),
        lastTrain: $("#last-train").val(),
        frequency: $("#frequency").val(),
    }
    firebase.ref().push(trainObj);
    
    $("#train-name").empty();
    $("#destination").empty();
    $("#first-train").empty();
    $("#last-train").empty();
    $("#frequency").empty();


})


firebase.ref().on("child_added", function(snapshot) {
    var snapval = snapshot.val();
    var firstMoment = moment(snapval.firstTrain, "HH:mm");
    var lastMoment = moment(snapval.lastTrain, "HH:mm");
    var tempMoment = moment();
    var tempLast = lastMoment;
        

    if(lastMoment.isBefore(firstMoment)){
        tempLast.add(24,"hours");
    }
    if(moment().isBefore(firstMoment)){
        tempMoment.add(24, "hours");
    }

    var remainder = (tempLast.diff(firstMoment,"minutes")) % snapval.frequency;
    tempLast.subtract(remainder, "minutes");
    lastMoment.subtract(remainder, "minutes");

    var nextArrival = moment();
    if(tempMoment.isAfter(tempLast)){
        nextArrival = firstMoment;
    }else{
        nextArrival.add((snapval.frequency - ((tempMoment.diff(firstMoment,"minutes")) % snapval.frequency)) , "minutes");
    }
    


    var minutesAway = nextArrival.diff(moment(), "minutes");
    // if(minutesAway < 0){
    //     minutesAway += 1440;
    // }

    $("#table").find("tbody").append(

        // <th>Train Name</th>
        // <th>Destination</th>
        // <th>First Train</th>
        // <th>Last Train</th>
        // <th>Frequency (min)</th>
        // <th>Next Arrival</th>
        // <th>Minutes Away</th>

        "<tr><td>" + snapval.name + 
        "</td><td>" + snapval.destination + 
        "</td><td>" + firstMoment.format("HH:mm") +
        "</td><td>" + lastMoment.format("HH:mm") +
        "</td><td>" + snapval.frequency + 
        "</td><td>" + nextArrival.format("HH:mm") + 
        "</td><td>" + minutesAway + "</td></tr>"
    );
});