const { test, expect } = require('@playwright/test');
const { BasePage } = require('../pages/basePage');
const appointment = require('../fixtures/appointment.json')

test.describe('Appointment form coverage tests', async () => {

    test.beforeEach(async ({ page }) => {
        const basePage = new BasePage(page)

        await page.goto("/")
        await basePage.makeApointmenButton.click()
        await basePage.insertGivenValidCredentials()
    })

    appointment.forEach((data) => {

        test(`Book appointment with ${data.info}: ${data.facility}`, async ({ page }) => {
            const basePage = new BasePage(page)
            await basePage.appointmentForm(data.facility, data.healthcareProgram, data.date, data.comment)
            await expect(page).toHaveURL(data.url)
            
            if (data.booked) {
                await expect(basePage.appointmentConfirmationHeader).toBeVisible()
                await expect(basePage.confirmedFacility).toHaveText(data.facility)
                await expect(basePage.confirmedHospitalReadmission).toHaveText(data.hospitalReadmission)
                await expect(basePage.confirmedProgram).toHaveText(data.healthcareProgram)
                await expect(basePage.confirmedDate).toHaveText(data.date)
                await expect(basePage.confirmedComment).toHaveText(data.comment) 
            }
        })
    })
})