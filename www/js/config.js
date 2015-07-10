/**
 * Created by DELL on 3/9/2015.
 */
'use strict'

var config = {

    version: "v1.0.1",

    clientId : "POSv1",
    clientSecret : "",
    grantType : "client_credentials",
    api : {
        url : "",

        version :''
    },
    imagePath : {
        url : ""
    },

    googleMap : {
        url : "https://maps.googleapis.com/maps/api/geocode/json?"
    },
    user : {
        location : "PreferredLocation"
    },
    database : {
        name : "",
        version : "1.0",
        description: "",
        size : 2 * 1024 * 1024
    },
    share : {
        title : "",
        message : "I’m using the PosAttraction App.",
        image : "",
        link : ""
    }
};