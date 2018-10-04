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
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {


        console.log('Received Event: ' + id);
    }
};


function geoFindMe() {
    var output = document.getElementById("out");

    if (!navigator.geolocation){
        output.innerHTML = "<p>Geolokation wird von ihrem Browser nicht unterstützt</p>";
        return;
    }

    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;

        output.innerHTML = '<p>Die Latitude ist ' + latitude + '° <br>Die Longitude ist ' + longitude + '°</p>';

        var img = new Image();
        img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

        output.appendChild(img);
    };

    function error() {
        output.innerHTML = "Es war nicht möglich Sie zu lokalisieren";
    };

    output.innerHTML = "<p>Lokalisieren…</p>";

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
    firebase.database().ref().push({
        "id" : {
            vorname: vorname,
            nachname: nachname,
            tel: tel
        }
    });
    console.log("geshikt!");
}

function writeUserData(userId, name, email) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email
    });
}