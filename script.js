// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

// variable declaration
let form;
let pilotName;
let copilotName;
let fuelLevel;
let cargoMass;
let faultyItems;
let pilotStatus;
let copilotStatus;
let fuelStatus;
let cargoStatus;
let launchStatush2;
let missionTarget;

const assignElements = () => {
    form = document.getElementById('launchForm');
    pilotName = document.getElementById('pilotName');
    copilotName = document.querySelector('input[name=copilotName]');
    fuelLevel = document.querySelector('input[name=fuelLevel]');
    cargoMass = document.querySelector('input[name=cargoMass]');
    faultyItems = document.getElementById('faultyItems');
    pilotStatus = document.getElementById('pilotStatus');
    copilotStatus = document.getElementById('copilotStatus');
    fuelStatus = document.getElementById('fuelStatus');
    cargoStatus = document.getElementById('cargoStatus');
    launchStatush2 = document.getElementById('launchStatus');
    missionTarget = document.getElementById('missionTarget');
};

const launchCheck = () => {

    if (Number(fuelLevel.value) < 10000) {
        faultyItems.style.visibility = "visible";
        fuelStatus.innerHTML = 'Not enough fuel';
        launchStatush2.style.color = 'red';
        launchStatush2.innerHTML = 'Shuttle not ready for launch';

        if (Number(cargoMass.value) > 10000) {
            cargoStatus.innerHTML = 'Too much cargo for takeoff';
        } else {
            cargoStatus.innerHTML = 'Cargo mass low enough for launch';
        }

    } else if (Number(cargoMass.value) > 10000) {
        faultyItems.style.visibility = "visible";
        launchStatush2.style.color = 'red';
        launchStatush2.innerHTML = 'Shuttle not ready for launch';
        cargoStatus.innerHTML = 'Too much cargo for takeoff';

        if (Number(fuelLevel.value) < 10000) {
            fuelStatus.innerHTML = 'Not enough fuel';
        } else {
            fuelStatus.innerHTML = 'Fuel level high enough for launch';
        }

    } else {
        faultyItems.style.visibility = "hidden";
        launchStatush2.style.color = 'green';
        launchStatush2.innerHTML = 'Shuttle is ready for launch';
    }
};

const validateInputs = (inputArr) => {

    // loop through and check for blank inputs
    for (let i = 0; i < inputArr.length; i++) {
        if (!inputArr[i].value) {
            alert('All fields are required');
            return false;
        }
    }

    // validate types 
    // if the expected string can be converted to number
    if (!isNaN(pilotName.value) || !isNaN(copilotName.value)) {
        alert('Names must be strings');
        return false;
    // if the expected numbers are not a number
    } else if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
        alert('Fuel level and cargo mass must be numbers');
        return false;
    } else {
        pilotStatus.innerHTML = `Pilot ${pilotName.value} Ready!`;
        copilotStatus.innerHTML = `Copilot ${copilotName.value} Ready!`;
        return true;
    }
};

// TODO chooseRandomPlanet
const chooseRandomPlanet = (planetArr) => {
    let index = Math.floor(Math.random() * planetArr.length);
    return planetArr[index];
};

const fillInTargetHTML = (planetData) => {
    missionTarget.innerHTML = 
    `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${planetData.name}</li>
            <li>Diameter: ${planetData.diameter}</li>
            <li>Star: ${planetData.star}</li>
            <li>Distance from Earth: ${planetData.distance}</li>
            <li>Number of Moons: ${planetData.moons}</li>
        </ol>
        <img src="${planetData.image}">
    `
};


// on load assigning event listeners
window.addEventListener('load', () => {

    assignElements();

    let formInputArr = [pilotName, copilotName, fuelLevel, cargoMass];
    
    fetch('https://handlers.education.launchcode.org/static/planets.json').then((planetData) => {
        planetData.json().then((json) => {
            fillInTargetHTML(chooseRandomPlanet(json));
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateInputs(formInputArr)) {
            launchCheck();
        }

    });

});

