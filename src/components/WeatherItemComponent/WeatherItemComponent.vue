<template>
    <div class=" shadow-xl p-5 rounded-lg w-full hover:z-20 transition-all duration-500 hover:shadow-2xl" :class="{
        'animate-pulse bg-black/20 text-transparent': loadingStore.loadingDashboard,
        'bg-white/80 text-black': !loadingStore.loadingDashboard,
    }">
        <div class="w-full">
            <div class="flex gap-2 items-center" :class="{
                'bg-black/20 rounded-full max-w-48': loadingStore.loadingDashboard,
            }">
                <span class="material-symbols-outlined text-[48px]">
                        {{ allIconTypes[weatherData.weatherIcon as keyof typeof allIconTypes] }}
                    </span>
                    <h3 class="text-md font-semibold py-1">{{ weatherData.date }}</h3>
                </div>

                <h2 class="text-lg font-bold my-2" :class="{
                    'bg-black/20 rounded-full max-w-56': loadingStore.loadingDashboard,
                }">{{ weatherData.averageTemp.toFixed(1) }}°C</h2>
                <p class="font-medium my-2" :class="{
                    'bg-black/20 rounded-full max-w-56': loadingStore.loadingDashboard,
                }">Low {{ weatherData.lowestTemp.toFixed(1) }}°C | High {{
    weatherData.highestTemp.toFixed(1) }}°C
                </p>
                <p class="font-medium my-2" :class="{
                    'bg-black/20 rounded-full max-w-96': loadingStore.loadingDashboard,
                }">Visibility: {{ (weatherData.averageVisibility / 1000).toFixed(0) }}KM</p>
                <p class="font-medium my-2" :class="{
                    'bg-black/20 rounded-full max-w-96': loadingStore.loadingDashboard,
                }">{{ weatherData.weatherDescription }}</p>
            </div>
            <div class="md:grid lg:grid-cols-4 md:grid-cols-2 gap-2 justify-between">
                <div v-for="weather in  weatherData.allData " :class="{
                    'bg-black/20 border-0': loadingStore.loadingDashboard,

                    'border-2': !loadingStore.loadingDashboard,
                }" class="my-1 rounded-lg p-1 shadow-xl hover:z-20 transition-all hover:shadow-2xl ">
                    <div class="p-2">
                        <span class="material-symbols-rounded text-[36px] w-full text-center drop-shadow-2xl z-0 " :class="{
                            'text-black/70': !loadingStore.loadingDashboard, 'text-transparent': loadingStore.loadingDashboard
                        }">
                            {{ allIconTypes[weather.weatherIcon as keyof typeof allIconTypes] }}
                    </span>
                    <h4 class="font-semibold text-[20px] text-center">{{ weather.date }}</h4>
                    <h4 class="font-semibold text-[20px] text-center">{{ weather.temp.toFixed(1) }}°C</h4>
                </div>

                <div class="grid grid-cols-2 gap-2 content-center justify-items-center">
                    <p class="font-medium text-sm">Feels like: {{ weather.feelsLike.toFixed(1) }}°C</p>
                    <p class="font-medium text-sm"><span class="material-symbols-outlined text-[20px]">cloud</span> {{
                        weather.cloudCover }}%</p>
                    <p class="font-medium text-sm"><span class="material-symbols-outlined text-[20px]">heat</span> {{
                        weather.humidity }}%</p>
                    <p class="font-medium text-sm"><span class="material-symbols-outlined text-[20px]">air</span>
                        {{ weather.wind }}m/s</p>
                </div>
                <p class="font-semibold text-center p-2">{{ weather.weatherDescription }}</p>
            </div>
        </div>

    </div>
</template>



<script lang="ts">
import { defineComponent } from 'vue';
import { useLoadingStore } from '../storeManager';

export default defineComponent({
    name: 'WeatherItem',
    props: {
        weatherData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            allIconTypes: {
                "01d": "sunny",
                "01n": "clear_night",
                "02d": "partly_cloudy_day",
                "02n": "partly_cloudy_night",
                "03d": "cloud",
                "03n": "cloud",
                "04d": "cloud",
                "04n": "cloud",
                "09d": "rain",
                "09n": "rain",
                "10d": "rainy",
                "10n": "rainy",
                "11d": "thunderstorm",
                "11n": "thunderstorm",
                "13d": "ac_unit",
                "13n": "ac_unit",
                "50d": "mist",
                "50n": "mist"
            },
            loadingStore: useLoadingStore(),

            isLoadingClass: {
                'bg-black/20': this.isLoading,
                'rounded-full': this.isLoading,
            }
        }
    },

    methods: {

    },

    async mounted() {

    }
})


</script>

