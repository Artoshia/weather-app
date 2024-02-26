<template>
    <div class="pt-24"></div>
    <Transition mode="out-in">
        <div class="grid grid-cols-1 gap-4">
            <div v-for="weatherData in currentLoadedData" class="p-2">
                <WeatherItemComponent :weatherData="weatherData" />
            </div>
        </div>
    </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherItemComponent from '../WeatherItemComponent/WeatherItemComponent.vue';

import { useLoadingStore, useLocationStore, useWeatherStore, loadingWeatherSkeletonData } from '../storeManager';



export default defineComponent({
    name: 'WeatherDashComponent',
    data() {
        return {
            loadingStore: useLoadingStore(),
            locationStore: useLocationStore(),
            weatherStore: useWeatherStore(),
            loadingSkeleton: loadingWeatherSkeletonData,
            currentLoadedData: loadingWeatherSkeletonData
        }
    },
    methods: {

    },
    components: {
        WeatherItemComponent
    },
    async mounted() {

        const update = () => {
            if (!this.loadingStore.allLoaded) {
                return
            }
            this.currentLoadedData = this.loadingStore.loadingDashboard ? loadingWeatherSkeletonData : this.weatherStore.weather
        }
        update()
        this.loadingStore.$subscribe(() => {
            update()
        });

    }
})


</script>

