import { test, expect } from "@playwright/test"
import Authorization from "../pageObjects/authorization";
import { authorizationData } from "../helpers/testData";

test.describe("Тестовое задание. Проверка друг за другом", () => {
    test.beforeEach(async ({ page }) => {
        const authorization = new Authorization(page);
        await authorization.loadAuthorizationPage();
    });

    test("Проверка пустых полей ввода", async ({ page }) => {
        const authorization = new Authorization(page);
        await expect(authorization.locators.getEmailPlaceholder()).toHaveValue("");
        await expect(authorization.locators.getPasswordPlaceholder()).toHaveValue("");
    });

    test("Проверка надписи «Ошибка входа» и рамки красного цвета", async ({ page }) => {
        const authorization = new Authorization(page);

        await authorization.fillEmailPlaceholder(authorizationData.email);
        await authorization.fillPasswordPlaceholder(authorizationData.password);
        await authorization.clickEnterButton();

        const errorMessage = authorization.locators.getErrorLoginMessage();
        await expect(errorMessage).toHaveCSS("background-color", "rgb(246, 226, 225)");

        await page.reload();
        await expect(errorMessage).not.toBeVisible();
    });

    test("Проверка входа через Яндекс и возврат", async ({ page }) => {
        const authorization = new Authorization(page);
        
        await authorization.clickYandexLogin();
        await authorization.expectRedirectYandex();
        await page.goBack();
    });

    test("Изменение текстовых элементов на английский язык", async ({ page }) => {
        const authorization = new Authorization(page);
        
        const login = authorization.locators.getLoginText();
        const email = authorization.locators.getEmailText();
        const password = authorization.locators.getPasswordText();
        const button = authorization.locators.getButtonText();
        const or = authorization.locators.getOrText();
        const yandex = authorization.locators.getYandexText();
        const vk = authorization.locators.getVkText();
        const lang = authorization.locators.getSelectLangText();

        // Английский язык
        await authorization.clickLanguageDropdown();
        await authorization.clickEnglishLanguage();
        // await page.reload();

        await expect(login).toHaveText("Login");
        await expect(email).toHaveText('User email');
        await expect(password).toHaveText('Password');
        await expect(button).toHaveText("Enter");
        await expect(or).toHaveText(" or login with ");
        await expect(yandex).toHaveText("Sign in with Yandex ID ");
        await expect(vk).toHaveText("Sign in with VK ID ");
        await expect(lang).toHaveText(" Select Language: ");
    });

    // test("Проверка текстовых элементов на русском языке", async ({ page }) => {

    //     const authorization = new Authorization(page);
        
    //     const login = authorization.locators.getLoginText();
    //     const email = authorization.locators.getEmailText();
    //     const password = authorization.locators.getPasswordText();
    //     const button = authorization.locators.getButtonText();
    //     const or = authorization.locators.getOrText();
    //     const yandex = authorization.locators.getYandexText();
    //     const vk = authorization.locators.getVkText();
    //     const lang = authorization.locators.getSelectLangText();      

    //     await expect(login).toHaveText(" Вход в систему ");
    //     await expect(email).toHaveText('Email пользователя');
    //     await expect(password).toHaveText('Пароль');
    //     await expect(button).toHaveText(" Войти ");
    //     await expect(or).toHaveText(" или войти с помощью ");
    //     await expect(yandex).toHaveText(" Войти через Яндекс ID ");
    //     await expect(vk).toHaveText(" Войти через VK ID ");
    //     await expect(lang).toHaveText(" Выбор языка: ");
       
    // });
});

