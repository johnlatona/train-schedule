  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDuhDxUm96ZAp2YULlHQp0aYED7J2lfZKI",
    authDomain: "train-schedule-554d4.firebaseapp.com",
    databaseURL: "https://train-schedule-554d4.firebaseio.com",
    projectId: "train-schedule-554d4",
    storageBucket: "",
    messagingSenderId: "247797904986"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var tName = '';
  var tDestination = '';
  var tFrequency = '';
  var tFirstTrainTime = '';

  var trains = [{
    name: "NYC Express",
    destination: "New York, NY",
    firstTrainTime: "04:00",
    frequency: 30
  }, 
  {
    name: "Atlantic City Express",
    destination: "Atlantic City, NJ",
    firstTrainTime: "08:00",
    frequency: 60
  },
  {
    name: "Philadelphia Local",
    destination: "Philadelphia, PA",
    firstTrainTime: "05:30",
    frequency: 120
  },
  {
    name: "Boston High Speed Rail",
    destination: "Boston, MA",
    firstTrainTime: "06:00",
    frequency: 120
  },
  {
    name: "D.C. Capitol Express",
    destination: "Washington, D.C.",
    firstTrainTime: "07:30",
    frequency: 240
  },
  {
    name: "California Dreamin'",
    destination: "Los Angeles, CA",
    firstTrainTime: "09:30",
    frequency: 6000
  },
  {
    name: "Maple Leaf Express",
    destination: "Toronto, ON, Canada",
    firstTrainTime: "08:00",
    frequency: 2000,
  }];

  var dataName;
  var dataDestination;
  var dataFrequency;
  var dataNextArrival;
  var dataMinutesAway;

  function pushData() {
    for(var i = 0; i < trains.length; i++) {
      tName = trains[i].name;
      tDestination = trains[i].destination;
      tFirstTrainTime = trains[i].firstTrainTime;
      tFrequency = trains[i].frequency;
      console.log(tName);
      console.log(tDestination);
      console.log(tFirstTrainTime);
      console.log(tFrequency);

      var firstTrainTimeConverted = moment(tFirstTrainTime, "h:mm A").subtract(1, "years");
      var currentTime = moment();
      var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
      var remainder = diffTime % tFrequency;
      var minutesTillTrain = tFrequency - remainder;
      var nextArrival = moment().add(minutesTillTrain, "minutes");
      console.log(nextArrival);

      database.ref().push({
        trainName: tName,
        destination: tDestination,
        firstTrainTime: tFirstTrainTime,
        frequency: tFrequency,
        nextArrival: moment(nextArrival).format("h:mm A"),
        minutesAway: minutesTillTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    }
  }

  database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
      var newRow = $("<tr>");
      dataName = $('<td class="dataName">');
      dataName.text(snapshot.val().trainName);
      dataDestination = $('<td class="dataDestination">');
      dataDestination.text(snapshot.val().destination);
      dataFrequency = $('<td class="dataFrequency">');
      dataFrequency.text(snapshot.val().frequency);
      dataNextArrival = $('<td class="dataNextArrival">');
      dataNextArrival.text(snapshot.val().nextArrival);
      dataMinutesAway = $('<td class="dataMinutesAway">');
      dataMinutesAway.text(snapshot.val().minutesAway);
      newRow.append(dataName);
      newRow.append(dataDestination);
      newRow.append(dataFrequency);
      newRow.append(dataNextArrival);
      newRow.append(dataMinutesAway);
      $("#train-table").append(newRow);
  }), function(errorObject) {
    console.log("Errors: " + errorObject.code);
  }

  database.ref().on("child_changed", function(snap) {
    dataName.text(snap.val().trainName);
    dataDestination.text(snap.val().destination);
    dataFrequency.text(snap.val().frequency);
    dataNextArrival.text(snap.val().nextArrival);
    dataMinutesAway.text(snap.val().minutesAway);
  }), function(errorObject) {
    console.log("Errors: " + errorObject.code);
  }


  $("#submit-button").on("click", function() {
    var newTrainName = $("#add-train-name").val();
    var newDestination = $("#add-destination").val();
    var newFirstTrainTime = $("#add-first-train-time").val();
    var newFrequency = $("#add-frequency").val();

    var newFirstTrainTimeConverted = moment(newFirstTrainTime, "h:mm A").subtract(1, "years");
    var newCurrentTime = moment();
    var newDiffTime = moment().diff(moment(newFirstTrainTimeConverted), "minutes");
    var newRemainder = newDiffTime % newFrequency;
    var newMinutesTillTrain = newFrequency - newRemainder;
    var newNextArrival = moment().add(newMinutesTillTrain, "minutes");
    console.log(newNextArrival);

    database.ref().push({
        trainName: newTrainName,
        destination: newDestination,
        firstTrainTime: newFirstTrainTime,
        frequency: newFrequency,
        nextArrival: moment(newNextArrival).format("h:mm A"),
        minutesAway: newMinutesTillTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

    var newRow = $("<tr>");
    var newDataName = $('<td class="dataName">');
    newDataName.text(snapshot.val().trainName);
    var newDataDestination = $('<td class="dataDestination">');
    newDataDestination.text(snapshot.val().destination);
    var newDataFrequency = $('<td class="dataFrequency">');
    newDataFrequency.text(snapshot.val().frequency);
    var newDataNextArrival = $('<td class="dataNextArrival">');
    newDataNextArrival.text(snapshot.val().nextArrival);
    var newDataMinutesAway = $('<td class="dataMinutesAway">');
    newDataMinutesAway.text(snapshot.val().minutesAway);
    newRow.append(dataName);
    newRow.append(dataDestination);
    newRow.append(dataFrequency);
    newRow.append(dataNextArrival);
    newRow.append(dataMinutesAway);
    $("#train-table").append(newRow);


  })

