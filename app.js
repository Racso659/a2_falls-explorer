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

