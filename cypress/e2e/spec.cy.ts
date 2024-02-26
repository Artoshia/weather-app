import { useWeatherStore, useLocationStore } from '../../src/components/storeManager'
import { createPinia, setActivePinia } from 'pinia'
import { getLocation } from '../../src/components/apiHandler'

describe('template spec', () => {
  setActivePinia(createPinia())
  getLocation()

  it('can visit site', () => {
    cy.visit('/')
  })

  it('can find the location component and see if it displays the location', () => {
    cy.visit('/')
    cy.get('button').should('contain', useLocationStore().location.city)
  })
  //scrolling causes the logo and name to collapse.
  it('can find the location component and see if scrolling hides the logo and name', () => {
    cy.visit('/')
    cy.get('button').should('contain', '')
    cy.get('.rounded-full').should('contain.text', "Weather")
    cy.scrollTo(0, 100)
    cy.get('.rounded-full').should('not.contain.text', "Weather")
  })

  it('can find the weather dash component and see if it displays the current weather 5 day forecast', () => {
    cy.visit('/')
    const currentWeather = useWeatherStore().weather
    for (let i = 1; i <= 5; i++) { //only most important information is checked for now. 3 Hourly data testing is something I could write with more time.
      const currentDate = currentWeather[i - 1].date
      cy.get(`:nth-child(${i}) > .p-5 > div.w-full > .flex > .text-md`).should('have.text', currentDate)
      cy.get(`:nth-child(${i}) > .p-5 > div.w-full > .text-lg`).should('have.text', currentWeather[i - 1].averageTemp.toFixed(1) + '°C')
      cy.get(`:nth-child(${i}) > .p-5 > div.w-full > :nth-child(5)`).should('have.text', currentWeather[i - 1].weatherDescription)
      cy.get(`:nth-child(${i}) > .p-5 > div.w-full > :nth-child(3)`).should('include.text', currentWeather[i - 1].lowestTemp.toFixed(1) + '°C')
      cy.get(`:nth-child(${i}) > .p-5 > div.w-full > :nth-child(3)`).should('include.text', currentWeather[i - 1].highestTemp.toFixed(1) + '°C')
    }
  })
})