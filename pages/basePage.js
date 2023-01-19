const facilityFieldSelect = '#combo_facility'
const visitDate = '[name="visit_date"]'

export class BasePage {

    constructor(page) {
        this.page = page
    }

    get usernameField() {
        return this.page.locator('[placeholder="Username"]:nth-child(1)')
    }

    get passwordField() {
        return this.page.locator('[placeholder="Password"]:nth-child(1)')
    }

    get loginButton() {
        return this.page.locator('#btn-login')
    }

    get hospitalReadmissionCheckbox() {
        return this.page.locator('#chk_hospotal_readmission')
    }

    get appointmentConfirmationHeader() {
        return this.page.getByRole('heading', { name: 'Appointment Confirmation' })
    }

    get confirmedDate() {
        return this.page.locator('#visit_date')
    }

    get confirmedProgram() {
        return this.page.locator('#program')
    }

    get confirmedFacility() {
        return this.page.locator('#facility')
    }

    get confirmedHospitalReadmission() {
        return this.page.locator('#hospital_readmission')
    }

    get confirmedComment() {
        return this.page.locator('#comment')
    }

    get bookAppointmentButton() {
        return this.page.locator('#btn-book-appointment')
    }

    get makeApointmenButton() {
        return this.page.locator('#btn-make-appointment')
    }

    get errorMessage() {
        return this.page.locator('.text-danger')
    }

    get menuButton() {
        return this.page.locator('.fa-bars')
    }

    get logoutLink() {
        return this.page.getByText('Logout')
    }

    get historyLink() {
        return this.page.getByText('History')
    }

    get profileLink() {
        return this.page.getByText('Profile')
    }

    get homeLink() {
        return this.page.getByText('Home')
    }

    async insertGivenValidCredentials() {
        const username = await this.page.inputValue('[placeholder="Username"]:nth-child(2)')
        await this.usernameField.fill(username)
        const password = await this.page.inputValue('[placeholder="Password"]:nth-child(2)')
        await this.passwordField.fill(password)
        await this.loginButton.click()
    }

    async selectFacility(value) {
        await this.page.locator(facilityFieldSelect).selectOption(value)
    }

    async selectHealthcareProgram(nameOfProgram) {
        await this.page.getByLabel(nameOfProgram).check()
    }

    async insertVisitDate(date) {
        await this.page.locator(visitDate).type(date, { delay: 100 })
    }

    async insertCommentLine(Comment) {
        await this.page.getByPlaceholder('Comment').fill(Comment)
    }

    async logInForm(username, password) {
        if (username === "" && password === "") {
            await this.loginButton.click()
        } else if (username === "") {
            await this.passwordField.fill(password)
            await this.loginButton.click()
        } else if (password === "") {
            await this.usernameField.fill(username)
            await this.loginButton.click()
        } else {
            await this.usernameField.fill(username)
            await this.passwordField.fill(password)
            await this.loginButton.click()
        }
    }

    async appointmentForm(facility, healthcareProgram, date, comment) {
        if (date === '') {
            await this.bookAppointmentButton.click()
        } else if (facility === "Seoul CURA Healthcare Center") {
            await this.selectFacility(facility)
            await this.hospitalReadmissionCheckbox.check()
            await this.selectHealthcareProgram(healthcareProgram)
            await this.insertVisitDate(date)
            await this.insertCommentLine(comment)
            await this.bookAppointmentButton.click()
        } else {
            await this.selectFacility(facility)
            await this.selectHealthcareProgram(healthcareProgram)
            await this.insertVisitDate(date)
            await this.insertCommentLine(comment)
            await this.bookAppointmentButton.click()
        }
    }
}