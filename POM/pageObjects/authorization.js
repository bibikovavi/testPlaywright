class Authorization {

    constructor(page) {
        this.page = page;
    }

    // locators
    locators = {
        getEmailPlaceholder: () => this.page.getByPlaceholder("name@example.com"),
        getPasswordPlaceholder: () => this.page.locator("#floatingPassword"),
        getEnterButton: () => this.page.locator(".w-100.btn.btn-lg.btn-primary"),
        getErrorLoginMessage: () => this.page.getByRole("alert"),

        getYandexLoginLink: () => this.page.locator("[href='/login/oauth2/ya/redirect']"),

        getLanguageDropdown: () => this.page.locator(".dropdown-toggle"),
        getEnglishLanguage: () => this.page.getByText("English"),
        getRussianLanguage: () => this.page.locator("[class='fw-bold']"),

        getLoginText: () => this.page.locator(".h4.mb-3.fw-normal"),
        getEmailText: () => this.page.locator("[for='floatingInput']"),
        getPasswordText: () => this.page.locator("[for='floatingPassword']"),
        getButtonText: () => this.page.locator(".w-100.btn.btn-lg.btn-primary"),
        getOrText: () => this.page.locator(".text-sm.text-center"),
        getYandexText: () => this.page.locator("[href='/login/oauth2/ya/redirect']"),
        getVkText: () => this.page.locator("[href='/login/oauth2/vk/redirect']"),
        getSelectLangText: () => this.page.locator("[class='d-inline-block me-2']"),
    };

    // methods 
    async loadAuthorizationPage() {
        await this.page.goto("/");
    }

    async fillEmailPlaceholder(email) {
        await this.locators.getEmailPlaceholder().fill(email);
        return this;
    }

    async fillPasswordPlaceholder(password) {
        await this.locators.getPasswordPlaceholder().fill(password);
        return this;
    }

    async clickEnterButton() {
        await this.locators.getEnterButton().click();
        return this;
    }

    async clickYandexLogin() {
        await this.locators.getYandexLoginLink().click();
    }

    async expectRedirectYandex() {
        await this.page.waitForURL(/passport\.yandex\.ru/, { timeout: 5000 });
    }

    async clickLanguageDropdown() {
        await this.locators.getLanguageDropdown().click();
    }

    async clickEnglishLanguage() {
        await this.locators.getEnglishLanguage().click();
        return this;
    }

    async clickRussianLanguage() {
        await this.locators.getRussianLanguage().click();
        return this;
    }
}

export default Authorization;