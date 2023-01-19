const { test, expect } = require('@playwright/test');
const { BasePage } = require('../pages/basePage');
const users = require("../fixtures/appointment.json")
const user = users[0]

test('Successfully scheduled appointment', async ({ page }) => {
    const basePage = new BasePage(page)

    await page.goto("/")
    await basePage.makeApointmenButton.click()
    await basePage.insertGivenValidCredentials()

    await expect(page).toHaveURL('/#appointment')

    await basePage.selectFacility(user.facility)
    await basePage.hospitalReadmissionCheckbox.check()

    await expect(basePage.hospitalReadmissionCheckbox).toBeChecked()

    await basePage.selectHealthcareProgram(user.healthcareProgram)
    await basePage.insertVisitDate(user.date)
    await basePage.insertCommentLine(user.comment)
    await basePage.bookAppointmentButton.click()

    await expect(basePage.appointmentConfirmationHeader).toBeVisible()
    await expect(basePage.confirmedFacility).toHaveText(user.facility)
    await expect(basePage.confirmedHospitalReadmission).toHaveText(user.hospitalReadmission)
    await expect(basePage.confirmedProgram).toHaveText(user.healthcareProgram)
    await expect(basePage.confirmedDate).toHaveText(user.date)
    await expect(basePage.confirmedComment).toHaveText(user.comment)

})