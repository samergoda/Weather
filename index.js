//Today's Card Variables:                                                   داتا اول كارد عندى
let today = document.getElementById("today"),
  todayDate = document.getElementById("today-date"),
  cityLocation = document.getElementById("location"),
  todayDegree = document.getElementById("today-degree"),
  todayIcon = document.getElementById("today-icon"),
  description = document.getElementById("today-description"),
  humidty = document.getElementById("humidty"),
  wind = document.getElementById("wind"),
  compass = document.getElementById("compass"),
  searchBar = document.getElementById("search-bar");

//Next Days Variables:                           الاتنين كاردز الى بعد اليوم الاول الى لسه هعرض فيهم
let nextDay = document.getElementsByClassName("nextDay"),
  nextDayIcon = document.getElementsByClassName("nextDay-icon"),
  maxDegree = document.getElementsByClassName("max-degree"),
  minDegree = document.getElementsByClassName("min-degree"),
  nextDayDescription = document.getElementsByClassName("nextDay-description"),
  currentCity = "Cairo",
  apiResponse,
  responseData,
  monthName = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Spet",
    "Oct",
    "Nov",
    "Dec",
  ],
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];


  async function getData(search) {
       let result = await fetch(
         `https://api.weatherapi.com/v1/forecast.json?key=57b5036cff3b43699b202240232002&q=${search}&days=3&aqi=no&alerts=no`
       );
      responseData = await result.json();
      // console.log(responseData);
      displayData();
      displayNextDay();
      getCoordintes();
    }
getData('alex')

let date = new Date()

function displayData() {
  today.innerHTML = days[date.getDay()]
  todayDate.innerHTML = `${date.getDate()}, ${monthName[date.getMonth()]}`
  cityLocation.innerHTML = responseData.location.name
  todayDegree.innerHTML = responseData.current.temp_c
  todayIcon.setAttribute('src',`https:${responseData.current.condition.icon}`)
  description.innerHTML = responseData.current.condition.text
  humidty.innerHTML = responseData.current.humidity
  wind.innerHTML = responseData.current.wind_kph
  compass.innerHTML = responseData.current.wind_dir
}

function displayNextDay() {
  for (let i = 0; i < nextDay.length; i++) {
 nextDay[i].innerHTML =
  days[new Date(responseData.forecast.forecastday[i + 1].date).getDay()]
  nextDayIcon[i].setAttribute('src' ,`https:${responseData.forecast.forecastday[i + 1].day.condition.icon}` )
  maxDegree[i].innerHTML = responseData.forecast.forecastday[i + 1].day.maxtemp_c
  minDegree[i].innerHTML = responseData.forecast.forecastday[i + 1].day.mintemp_c
  nextDayDescription[i].innerHTML = responseData.forecast.forecastday[i + 1].day.condition.text
}
}



searchBar.addEventListener("keyup", function (e) {
    let code = e.target.value;
    getData(code);
  });


 // Step 1: Get user coordinates
function getCoordintes() {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		var crd = pos.coords;
		var lat = crd.latitude.toString();
		var lng = crd.longitude.toString();
		var coordinates = [lat, lng];
		// console.log(`Latitude: ${lat}, Longitude: ${lng}`);
		getCity(coordinates);
		return;

	}

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);
}

// Step 2: Get city name
function getCity(coordinates) {
	var xhr = new XMLHttpRequest();
	var lat = coordinates[0];
	var lng = coordinates[1];

	// Paste your LocationIQ token below.
	xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.abb9a1f46352c4755b5d1b9bcb4262d7 &lat=" +
	lat + "&lon=" + lng + "&format=json", true);
	// xhr.send();
	xhr.onreadystatechange = processRequest;
	xhr.addEventListener("readystatechange", processRequest, false);

	function processRequest(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);
			var city = response.address.city;
			// console.log(city);

			return; 
     
		}
	} 
      
}


  