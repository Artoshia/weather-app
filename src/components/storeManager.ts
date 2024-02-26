import { defineStore } from 'pinia'


type Weather = {
    date: string;
    weatherType: string;
    averageTemp: number;
    highestTemp: number;
    lowestTemp: number;
    weatherDescription: string;
    averageVisibility: number;
    allData: {
        date: string,
        weatherDescription: string,
        weatherType: string,
        temp: number,
        feelsLike: number,
        cloudCover: number,
        humidity: number,
        wind: number,
        visibility: number,
    }[]
}[]

const loadingSkeletonData = Array(8).fill(
    {
        date: "loading...",
        weatherType: "loading..",
        averageTemp: 0,
        highestTemp: 0,
        lowestTemp: 0,
        averageVisibility: 0,
        weatherDescription: "loading...",
        allData: Array(8).fill({
            date: "loading...",
            weatherDescription: "loading...",
            weatherType: "loading...",
            temp: 0,
            feelsLike: 0,
            cloudCover: 0,
            humidity: 0,
            wind: 0,
            visibility: 0,
        })
    })

export const loadingWeatherSkeletonData = loadingSkeletonData



export const useWeatherStore = defineStore({
    id: 'weather',
    state: () => ({
        weather: loadingSkeletonData as Weather,
    }),
    actions: {
        setWeather(weather: Weather) {
            this.weather = weather
        },
    },
})

type Location = {
    lon: number
    lat: number
    countryCode: string
    city: string
}


export const useLocationStore = defineStore({
    id: 'location',
    state: () => ({
        location: { lon: 0, lat: 0, countryCode: "_", city: "_" } as Location,
    }),
    actions: {
        setLocation(location: Location) {
            this.location = location
        }
    }
})


type AllLoaded = {
    loadingCountry: boolean
    loadingDashboard: boolean
}

function checkLoaded(stateVals: AllLoaded): boolean {
    let stillLoading = false
    for (let state in stateVals) {
        if (state == "allLoaded") {
            continue
        }
        stillLoading = stateVals[state as keyof AllLoaded]
    }
    return !stillLoading
}

export const useLoadingStore = defineStore({
    id: 'loading',
    state: () => ({
        loadingCountry: true,
        loadingDashboard: true,
        allLoaded: false,
    }),
    actions: {
        setLoadingCountry(loading: boolean) {
            this.loadingCountry = loading
            this.allLoaded = checkLoaded(this.$state)
        },
        setLoadingDashboard(loading: boolean) {
            this.loadingDashboard = loading
            this.allLoaded = checkLoaded(this.$state)
        }
    }
})

