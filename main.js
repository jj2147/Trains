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
        frequency: $("#frequency").val(),
    }
    firebase.ref().push(trainObj);
    
    $("#train-name").empty();
    $("#destination").empty();
    $("#first-train").empty();
    $("#frequency").empty();


})


firebase.ref.on("child_added", function(snapshot, prevChildKey) {
    var snapval = snapshot.val();

    $("#table").find("tbody").append(
        "<tr><td>" + snapval.name + 
        "</td><td>" + snapval.destination + 
        "</td><td>" + snapval.firstTrain +
        "</td><td>" + snapval.frequency
    );

});