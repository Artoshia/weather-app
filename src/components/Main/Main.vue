<template>
	<div class="relative">

		<div class="min-h-screen bg-repeat bg-fixed w-full h-full absolute opacity-0 transition-all top-0 left-0 -z-10"
			:style="{ 'background-image': `url(${background})` }" :class="{
				'opacity-20': loadingStore.allLoaded
			}">
		</div>

		<div class="flex justify-center w-full">
			<div class="max-w-screen-2xl w-full">
				<LocationComponent />
				<WeatherDashComponent />
			</div>
		</div>
	</div>
</template>


<script setup lang="ts">

import LocationComponent from '../LocationComponent/LocationComponent.vue'
import WeatherDashComponent from '../WeatherDashComponent/WeatherDashComponent.vue'

import background from '../../assets/topography-bg.svg';

import { useLoadingStore } from '../storeManager';

const loadingStore = useLoadingStore();
</script>

