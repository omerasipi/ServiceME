/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        geoFindMe();
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDG4GIjypq_Bzl2seXhjZBR5FwMEeNN4gA",
            authDomain: "serviceme-69587.firebaseapp.com",
            databaseURL: "https://serviceme-69587.firebaseio.com",
            projectId: "serviceme-69587",
            storageBucket: "serviceme-69587.appspot.com",
            messagingSenderId: "326807269904"
        };
        firebase.initializeApp(config);

        document.getElementById('submitButton').addEventListener('click', submitButton);
        document.addEventListener('prechange', function(event) {
            document.querySelector('ons-toolbar .center')
                .innerHTML = event.tabItem.getAttribute('beschreibung');
        });
        readDB();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {


        console.log('Received Event: ' + id);
    }
};


function geoFindMe() {


    if (!navigator.geolocation){
        // output.innerHTML = "<p>Geolokation wird von ihrem Browser nicht unterstützt</p>";
        return;
    }

    function success(position) {
         var latitude  = position.coords.latitude;
         var longitude = position.coords.longitude;

         window.localStorage.setItem("latitude", latitude);
         window.localStorage.setItem("longitude",longitude);
        console.log("gps");
        // output.innerHTML = '<p>Die Latitude ist ' + latitude + '° <br>Die Longitude ist ' + longitude + '°</p>';

        // var img = new Image();
        // img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
        //
        // output.appendChild(img);
    };

    function error() {
        // output.innerHTML = "Es war nicht möglich Sie zu lokalisieren";
    };

    // output.innerHTML = "<p>Lokalisieren…</p>";
    navigator.geolocation.getCurrentPosition(success, error);

}
app.initialize();

function displayOeffnen() {
    document.getElementById("menu1").style.display = "block";
    document.getElementById("menu2").style.display = "none";
    console.log("Display1");
}

function displayVerwalten() {
    document.getElementById("menu1").style.display = "none";
    document.getElementById("menu2").style.display = "block";
    console.log("Display2");
}




function submitButton() {
    var vorname = document.getElementById("vorname").value;
    var nachname = document.getElementById("nachname").value;
    var tel = document.getElementById("tel").value;
    var latitude  = localStorage.getItem("latitude");
    var longitude = localStorage.getItem("longitude");


    var obj = {};
    obj = {
        "id": getdbId(),
        "nachname": nachname,
        "vorname": vorname,
        "tel": tel,
        "latitude": latitude,
        "longitude": longitude
    };

    console.log(obj);
    writeFirebaseObject(obj);

    console.log("geshikt!");
}

function getdbId() {
    var database = firebase.database();

    return("1");
}

function writeFirebaseObject(obj) {
    firebase.database().ref("tickets/").push(obj);
}

function readDB() {
    var database = firebase.database();
    // var firebaseHeadingRef = firebase.database().ref("tickets/1").child("vorname");
    //
    // firebaseHeadingRef.on('value', function (datasnapshot) {
    //    console.log(datasnapshot.val());
    // });

    var leadsRef = database.ref('tickets/');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            console.log(childData);
        });
    });

    console.log("okee");
}