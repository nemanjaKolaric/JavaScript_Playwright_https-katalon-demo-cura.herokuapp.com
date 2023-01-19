const { test, expect } = require('@playwright/test');
const { BasePage } = require('../pages/basePage');

test.describe('Menu options: ', async () => {

    test.beforeEach(async ({ page }) => {
        const basePage = new BasePage(page)

        await page.goto('/')
        await basePage.makeApointmenButton.click()
        await basePage.insertGivenValidCredentials()
        await basePage.menuButton.click()

    })

    test('Home link', async ({ page }) => {
        const basePage = new BasePage(page)
        await basePage.homeLink.click()

        await expect(page).toHaveURL('/')
    })

    test('History link', async ({ page }) => {
        const basePage = new BasePage(page)
        await basePage.historyLink.click()

        await expect(page).toHaveURL('/history.php#history')
    })

    test('Profile link', async ({ page }) => {
        const basePage = new BasePage(page)
        await basePage.profileLink.click()

        await expect(page).toHaveURL('/profile.php#profile')
    })

    test('Logout link', async ({ page }) => {
        const basePage = new BasePage(page)
        await basePage.logoutLink.click()

        await expect(page).toHaveURL('/')
    })

})