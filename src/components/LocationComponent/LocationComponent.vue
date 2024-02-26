<template>
	<div class="fixed right-0 top-0 transition-all "
		:class="{ 'flex justify-center w-full': expand, 'w-[10rem]': !expand }">
		<div :class="{ 'max-w-screen-2xl w-full': expand }">
			<div class="rounded-full px-4 py-2 my-5 shadow-xl transition-all duration-500 mx-2 " :class="{
				'text-transparent animate-pulse bg-black/20': loadingStore.loadingCountry,
				'text-black bg-white/90': !loadingStore.loadingCountry,
				'flex justify-between': expand,
			}">

				<div class="flex gap-2 text-lg items-center" v-if="expand">
					<span class="material-symbols-outlined text-[48px]">
						cloud
					</span>
					<h1 class="font-black">Weather</h1>
				</div>

				<button class="bg-transparent border-0 font-semibold tracking-normal flex items-center gap-2"
					:class="{ ['animate-pulse']: loadingStore.loadingCountry }">
					{{ locationStore.location.city }}
					<span class="text-lg">{{ countryFlag }}</span>
				</button>
			</div>
		</div>

	</div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useLoadingStore, useLocationStore } from '../storeManager';
//import { storeToRefs } from 'pinia';

export default defineComponent({
	name: 'LocationComponent',
	data() {
		return {
			loadingStore: useLoadingStore(),
			locationStore: useLocationStore(),
			countryFlag: '',
			expand: true,
		}
	},
	methods: {
		getFlagEmoji() { // Function to get the flag emoji from the country code
			const countryCode = this.locationStore.location.countryCode;

			const codePoints = countryCode
				.toUpperCase()
				.split('')
				.map((char) => 127397 + char.charCodeAt(0));
			return String.fromCodePoint(...codePoints);
		},
		handleScroll() {
			const scroll = window.scrollY;
			this.expand = scroll <= 10;
		}
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll);
		this.getFlagEmoji();
		this.locationStore.$subscribe(() => {
			this.countryFlag = this.getFlagEmoji();
		});
	},
	unmounted() {
		window.removeEventListener('scroll', this.handleScroll);
	},
})


</script>

