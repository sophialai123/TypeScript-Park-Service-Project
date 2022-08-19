"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raccoon_meadows_log_1 = require("./raccoon-meadows-log");
const wolf_point_log_1 = require("./wolf-point-log");
//volunteers is an array of objects
function combineVolunteers(volunteers) {
    // combine them to match the Volunteers type.
    return volunteers.map(volunteer => {
        //Our goal is to make our combinedVolunteers match the Volunteers type.
        let id = volunteer.id;
        if (typeof id === "string") {
            //parseInt() is a function that takes two arguments: a string to parse and a number for what the integer should be based on. The most typical base is base 10. Since 10 is not the default base, we must provide it as an argument.
            id = parseInt(id, 10);
        }
        //Volunteers type object
        return {
            id: id,
            name: volunteer.name,
            activities: volunteer.activities
        };
    });
}
//check if a volunteer’s hours are verified.
function isVerified(verified) {
    if (typeof verified === "string") {
        return verified === "Yes";
    }
    return verified;
}
//If the activity is verified, we need to add the activity’s number of hours to the hours variable
// Since activity will be an item from activities from either park, set its type as CombinedActivity
function getHours(activity) {
    //check if the 'hours' key exists on activity.
    if ("hours" in activity) {
        return activity.hours;
    }
    else {
        return activity.time;
    }
}
function calculateHours(volunteers) {
    return volunteers.map((volunteer) => {
        let hours = 0;
        volunteer.activities.forEach((activity) => {
            //use isVerified function to verify activities
            //calling isVerified() and passing in activity.verified as the argument.
            if (isVerified(activity.verified)) {
                //hours plus the activity’s number of hours.
                hours = hours + getHours(activity);
            }
        });
        return {
            id: volunteer.id,
            name: volunteer.name,
            hours: hours,
        };
    });
}
//sorting hours by desc order
function byHours(a, b) {
    return b.hours - a.hours;
}
const combinedVolunteers = combineVolunteers([].concat(wolf_point_log_1.wolfPointVolunteers, raccoon_meadows_log_1.raccoonMeadowsVolunteers));
const result = calculateHours(combinedVolunteers);
console.log(result.sort(byHours));
//console.log(combinedVolunteers)
