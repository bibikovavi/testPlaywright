import { test, expect } from "@playwright/test"
import Authorization from "../pageObjects/authorization";

test.describe("Тестовое задание. Проверка изыков", () => {

    test("Проверка текстовых элементов на английском языке", async ({ page }) => {
        await page.context().addCookies([{
            name: 'ds_lg',
            value: 'en',
            domain: 'ds.retail-soft.pro',
            path: '/',
        }]);
          
        const authorization = new Authorization(page);
        await authorization.loadAuthorizationPage();
        
        const login = authorization.locators.getLoginText();
        const email = authorization.locators.getEmailText();
        const password = authorization.locators.getPasswordText();
        const button = authorization.locators.getButtonText();
        const or = authorization.locators.getOrText();
        const yandex = authorization.locators.getYandexText();
        const vk = authorization.locators.getVkText();
        const lang = authorization.locators.getSelectLangText();

        // await authorization.clickLanguageDropdown();
        // await authorization.clickEnglishLanguage();

        await expect(login).toHaveText("Login");
        await expect(email).toHaveText('User email');
        await expect(password).toHaveText('Password');
        await expect(button).toHaveText("Enter");
        await expect(or).toHaveText(" or login with ");
        await expect(yandex).toHaveText("Sign in with Yandex ID ");
        await expect(vk).toHaveText("Sign in with VK ID ");
        await expect(lang).toHaveText(" Select Language: ");
    });

    test("Проверка текстовых элементов на русском языке", async ({ page }) => {
        await page.context().addCookies([{
            name: 'ds_lg',
            value: 'ru',
            domain: 'ds.retail-soft.pro',
            path: '/',
        }]);
          
        const authorization = new Authorization(page);
        await authorization.loadAuthorizationPage();
        
        const login = authorization.locators.getLoginText();
        const email = authorization.locators.getEmailText();
        const password = authorization.locators.getPasswordText();
        const button = authorization.locators.getButtonText();
        const or = authorization.locators.getOrText();
        const yandex = authorization.locators.getYandexText();
        const vk = authorization.locators.getVkText();
        const lang = authorization.locators.getSelectLangText();      

        // await authorization.clickLanguageDropdown();
        // await authorization.clickRussianLanguage();

        await expect(login).toHaveText(" Вход в систему ");
        await expect(email).toHaveText('Email пользователя');
        await expect(password).toHaveText('Пароль');
        await expect(button).toHaveText(" Войти ");
        await expect(or).toHaveText(" или войти с помощью ");
        await expect(yandex).toHaveText(" Войти через Яндекс ID ");
        await expect(vk).toHaveText(" Войти через VK ID ");
        await expect(lang).toHaveText(" Выбор языка: ");
       
    });
});