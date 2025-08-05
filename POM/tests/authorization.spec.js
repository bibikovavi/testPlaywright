import { test, expect } from "@playwright/test"
import Authorization from "../pageObjects/authorization";
import { authorizationData } from "../helpers/testData";

test.describe("Тестовое задание. Основные проверки", () => {
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
});

