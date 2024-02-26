import LocationComponent from './LocationComponent.vue'
import { useWeatherStore, useLocationStore, useLoadingStore } from '../storeManager'
import { createPinia, setActivePinia } from 'pinia'
import { getLocation } from '../apiHandler'
import axios from 'axios'

setActivePinia(createPinia())
await getLocation()

const ExpectedCity = useLocationStore().location.city
const ExpectedCountryCode = useLocationStore().location.countryCode

describe('LocationComponent', () => {
    it('mounts', () => {
        cy.mount(LocationComponent)
        cy.get('h1').should('contain', 'Weather')
    })

    it('displays the location', () => {
        cy.mount(LocationComponent)
        cy.get('button').should('contain', ExpectedCity)
    })
})
