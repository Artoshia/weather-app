import LocationComponent from './LocationComponent.vue'
import { useLocationStore } from '../storeManager'
import { createPinia, setActivePinia } from 'pinia'
import { getLocation } from '../apiHandler'

setActivePinia(createPinia())
await getLocation()

const ExpectedCity = useLocationStore().location.city

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
