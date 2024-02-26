import axios from 'axios';

import { useLoadingStore, useLocationStore, useWeatherStore } from './storeManager';

const apikey = "ec3f68deab56cab228fd7af2c33943a2" //i would never let this be public normally, instead it would be behind a server, for this application it is fine.


export const getLocation = async () => {
	const loadingStore = useLoadingStore()
	const locationStore = useLocationStore()
	loadingStore.setLoadingCountry(true)

	const result = await axios.get('https://ipapi.co/json/').catch((err) => {
		console.warn(err)

		return null
	})

	if (!result) {
		return
	}
	const { latitude, longitude, city, country_code } = result.data;
	locationStore.setLocation({ lat: latitude, lon: longitude, city, countryCode: country_code });
	loadingStore.setLoadingCountry(false);

	getWeather()
}


export const getWeather = async () => {
	const loadingStore = useLoadingStore()
	const locationStore = useLocationStore()
	const weatherStore = useWeatherStore()
	loadingStore.setLoadingDashboard(true)

	const { lat, lon } = locationStore.location
	const result = await axios
		.get(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`
		)
		.catch((err) => {
			console.warn(err)
			return null
		})
	if (!result) {
		return
	}
	const weatherData = result.data

	let startingTime = weatherData.list[0].dt
	let daySeconds = 60 * 60 * 24
	let DailyGroups = []

	for (let i = 0; i < 5; i++) {
		let DailyGroup = weatherData.list.filter((item: any) => {
			return item.dt < startingTime + daySeconds && item.dt >= startingTime
		})
		DailyGroups.push(DailyGroup)
		startingTime += daySeconds
	}

	type WeatherDay = {
		date: string;
		weatherType: string;
		averageTemp: number;
		highestTemp: number;
		lowestTemp: number;
		averagevisibility: number;
		allData: {
			date: string
			weatherDescription: string
			weatherType: string
			temp: number
			feelsLike: number
			cloudCover: number
			humidity: number
			wind: number
			visibility: number
		}[];
	};

	type IconSetup = [
		{
			weather: [
				{
					icon: string
					description: string
				}
			]
		}
	]

	//NOTE: this is a pretty bad function that if i had more time would rewrite to be more clear and have easier data entry for icons so the sorting algorithm can be simpler.
	function findMostCommonIcon(arr: IconSetup): { weatherIcon: string, weatherDescription: string } { //not a optimised algorithm but its simple and works for this use case.
		let shallowCopy = arr.slice(0) //clone array so we dont mutate the original

		let foundArray = shallowCopy.sort((a, b) =>
			arr.filter(arrayItem => arrayItem.weather[0].icon === a.weather[0].icon).length
			- arr.filter(arrayItem => arrayItem.weather[0].icon === b.weather[0].icon).length
		)[7]

		const weatherIcon = foundArray?.weather[0].icon || "01d"
		const weatherDescription = foundArray?.weather[0].description || "clear sky"

		return { weatherIcon, weatherDescription };
	}

	function formatDescription(description: string) { //makes first character uppercase
		return description.charAt(0).toUpperCase() + description.slice(1);
	}


	let FormattedGroups = DailyGroups.map((group) => {

		let date = new Date(group[0].dt * 1000).toDateString()
		let weatherType = group[3].weather[0].main

		let { weatherIcon, weatherDescription } = findMostCommonIcon(group)
		weatherDescription = formatDescription(weatherDescription)

		let averageTemp = 0
		let highestTemp = -100
		let lowestTemp = 100
		let averageVisibility = 0

		let allData: WeatherDay['allData'] = group.map((item: any) => {

			averageTemp += item.main.temp
			highestTemp = item.main.temp > highestTemp ? item.main.temp : highestTemp
			lowestTemp = item.main.temp < lowestTemp ? item.main.temp : lowestTemp
			averageVisibility += item.visibility


			let time = new Date(item.dt * 1000)
			let formattedTime = time.toTimeString().slice(0, 5)

			return {
				date: formattedTime,
				weatherDescription: formatDescription(item.weather[0].description),
				weatherType: item.weather[0].main,
				weatherIcon: item.weather[0].icon,
				temp: item.main.temp,
				feelsLike: item.main.feels_like,
				cloudCover: item.clouds.all,
				humidity: item.main.humidity,
				wind: item.wind.speed,
				visibility: item.visibility,
			}
		})

		allData.sort((a, b) => { //sorts the date from earliest in the morning to latest.
			return a.date > b.date ? 1 : -1
		})

		averageTemp = averageTemp / group.length
		averageVisibility = averageVisibility / group.length
		return {
			date,
			weatherType,
			weatherIcon,
			weatherDescription,
			averageTemp,
			highestTemp,
			lowestTemp,
			averageVisibility,
			allData,
		}
	})


	weatherStore.setWeather(FormattedGroups)
	loadingStore.setLoadingDashboard(false)
}
