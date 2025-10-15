// 1. Variables Globales
let map;
let infoWindow;
let geocoder;
let directionsService;
let directionsRenderer;
let allMarkers = [];
let userCoords = null; 

// Information of the falls, more than 10 marks
const initialLocations = [
    { title: "Albion Falls", lat: 43.2045, lng: -79.8149, category: "Cascada", address: "885 Mountain Brow Blvd", unique_info: "Una de las cascadas en cascada más hermosas de la zona." },
    { title: "Tew Falls", lat: 43.2987, lng: -79.9926, category: "Cascada", address: "581 Harvest Rd", unique_info: "La cascada más alta de Hamilton, ¡casi tan alta como el Niágara!" },
    { title: "Webster's Falls", lat: 43.3005, lng: -79.9928, category: "Cascada", address: "581 Harvest Rd", unique_info: "Una cascada clásica tipo cortina, gran mirador." },
    { title: "Tiffany Falls", lat: 43.2504, lng: -79.9723, category: "Sendero", address: "900 Wilson St W", unique_info: "Una cascada delgada y elegante, popular para senderismo." },
    { title: "Borer's Falls", lat: 43.3323, lng: -80.0039, category: "Cascada", address: "Rock Chapel Rd", unique_info: "Una cascada remota con excelentes vistas al valle." },
    { title: "Devil's Punchbowl", lat: 43.2201, lng: -79.7678, category: "Parque", address: "Regional Rd 56", unique_info: "Un profundo cañón con una pequeña cascada y vistas panorámicas." },
    { title: "Princess Falls", lat: 43.2483, lng: -79.9871, category: "Sendero", address: "Cootes Paradise Trail", unique_info: "Una cascada en el sendero, ideal para un paseo tranquilo." },
    { title: "Felker's Falls", lat: 43.2263, lng: -79.7788, category: "Cascada", address: "Ackland St", unique_info: "Una cascada escalonada con un pequeño parque alrededor." },
    { title: "Sherman Falls", lat: 43.2450, lng: -79.9670, category: "Cascada", address: "Old Dundas Rd", unique_info: "Una cascada ancha y potente, fácil de fotografiar." },
    { title: "Dundas Peak Trailhead", lat: 43.2995, lng: -79.9950, category: "Sendero", address: "581 Harvest Rd", unique_info: "Punto de inicio para varios senderos clave con vistas." },
    { title: "Smokey Hollow Falls", lat: 43.3320, lng: -79.9482, category: "Cascada", address: "Smokey Hollow Rd", unique_info: "Una hermosa cascada fuera de lo común." }
];
function initMap() {
    const hamilton = { lat: 43.2557, lng: -79.8711 }; 

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: hamilton,
        mapId: 'DEMO_MAP_ID' 
    });

    // Google maps services
    infoWindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder();
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
    
    // Cargar marcadores iniciales
    initialLocations.forEach(addMarker);
    populateDestinationSelect();
}

function addMarker(locationData) {
    const marker = new google.maps.Marker({
        position: { lat: locationData.lat, lng: locationData.lng },
        map: map,
        title: locationData.title
    });

// app.js - Dentro de la función addMarker
// ...
    const content = `
        <div class="info-window-content">
            <h5 class="mb-1 text-primary">${locationData.title}</h5>
            <p class="mb-1"><strong>Categoría:</strong> ${locationData.category}</p>
            <p class="mb-1"><strong>Dirección:</strong> ${locationData.address}</p>
            <p class="mb-1 text-muted">${locationData.unique_info}</p>
            <hr class="my-1">
            <button class="btn btn-sm btn-info text-white mt-1" 
                    onclick="setDestinationFromTitle('${locationData.title}')">
                Get Directions Here
            </button>
        </div>
    `;
// ...

    // Listener para abrir InfoWindow
    marker.addListener('click', () => {
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
    });


    allMarkers.push({
        marker: marker,
        category: locationData.category,
        title: locationData.title,
        position: marker.getPosition() // Guarda el LatLng literal
    });
}

function filterMarkers(category) {
    allMarkers.forEach(item => {
        // Muestra el marcador si es 'Todos' o si coincide la categoría
        if (category === 'Todos' || item.category === category) {
            item.marker.setVisible(true);
        } else {
            item.marker.setVisible(false);
        }
    });
}


let userLocationMarker = null;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, { timeout: 10000 });
    } else {
        alert("Geolocation is not supported on the browser");
    }
}

function success(position) {
    userCoords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

  
    if (userLocationMarker) {
        userLocationMarker.setMap(null);
    }

    userLocationMarker = new google.maps.Marker({
        position: userCoords,
        map: map,
        title: "My current location",
        icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', 
            scaledSize: new google.maps.Size(40, 40)
        }
    });

    map.setCenter(userCoords);
    infoWindow.setContent('<div class="text-center">¡You are here! (origin of the route)</div>');
    infoWindow.open(map, userLocationMarker);
}

function error(err) {
    alert(`Geolocation error! code ${err.code}: ${err.message}`);
}

//marker submission 
function handleNewMarkerSubmit(event) {
    event.preventDefault(); 

    const address = document.getElementById('newAddress').value;
    const title = document.getElementById('newTitle').value;
    const category = document.getElementById('newCategory').value;
    const unique_info = document.getElementById('newUniqueInfo').value;

    geocoder.geocode({ 'address': address }, (results, status) => {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            
            const newLocationData = {
                title: title,
                address: address,
                category: category,
                unique_info: unique_info,
                lat: location.lat(),
                lng: location.lng()
            };

            addMarker(newLocationData); // Reuse addMarker function
            map.setCenter(location);
            
            populateDestinationSelect(); 
            
            document.getElementById('new-marker-form').reset();
            
        } else {
            alert('Geocoding failed for the following reason: ' + status);
        }
    });
}

// Populates the Destination dropdown with all marker titles added from Hamilton or areas
function populateDestinationSelect() {
    const select = document.getElementById('destinationSelect');
    select.innerHTML = '<option value="">Select a destination</option>'; 

    allMarkers.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = index; 
        option.textContent = item.title;
        select.appendChild(option);
    });
}

// Helper to set the dropdown value when clicking the InfoWindow link
function setDestinationFromTitle(title) {
    const select = document.getElementById('destinationSelect');
    const option = Array.from(select.options).find(opt => opt.textContent === title);
    if (option) {
        select.value = option.value;
        calculateRoute();
    }
}
function calculateRoute() {
    const destinationIndex = document.getElementById('destinationSelect').value;

    if (!userCoords) {
        alert("Error! You must click 'Mark My Location' first to set the origin.");
        return;
    }
    if (!destinationIndex) {
        alert("You must select a destination.");
        return;
    }

    const originLocation = userCoords; 
    const destinationItem = allMarkers[destinationIndex];
    
    const request = {
        origin: originLocation,
        destination: destinationItem.position,
        travelMode: google.maps.TravelMode.DRIVING 
    };

    directionsRenderer.setDirections({ routes: [] }); 
    
    directionsService.route(request, (result, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
        } else {
            alert('Could not calculate route: ' + status);
        }
    });
}

