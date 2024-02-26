import WeatherDashComponent from './WeatherDashComponent.vue'
import { useWeatherStore } from '../storeManager'
import { createPinia, setActivePinia } from 'pinia'
import { getLocation, getWeather } from '../apiHandler'


setActivePinia(createPinia())
await getLocation()
await getWeather()

//tests the WeatherDashComponent & the storeManager.ts & apiHandler.ts & WeatherItemComponent
describe('WeatherDashComponent', () => {
    it('mounts and has correct values for current weather.', () => {
        cy.mount(WeatherDashComponent)

        const currentWeather = useWeatherStore().weather
        
        for (let i = 1; i <= 5; i++) { //only most important information is checked for now. 3 Hourly data testing is something I could write with more time.
            const currentDate = currentWeather[i-1].date
            cy.get(`:nth-child(${i}) > .p-5 > div.w-full > .flex > .text-md`).should('have.text', currentDate)
            cy.get(`:nth-child(${i}) > .p-5 > div.w-full > .text-lg`).should('have.text', currentWeather[i-1].averageTemp.toFixed(1) + '°C')
            cy.get(`:nth-child(${i}) > .p-5 > div.w-full > :nth-child(5)`).should('have.text', currentWeather[i - 1].weatherDescription)
            cy.get(`:nth-child(${i}) > .p-5 > div.w-full > :nth-child(3)`).should('include.text', currentWeather[i - 1].lowestTemp.toFixed(1) + '°C')
            cy.get(`:nth-child(${i}) > .p-5 > div.w-full > :nth-child(3)`).should('include.text', currentWeather[i - 1].highestTemp.toFixed(1) + '°C')
        }
        
    })
})
