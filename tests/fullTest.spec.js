import { test, expect } from "@playwright/test"

test.describe("Тестовое задание. Проверка друг за другом", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("Проверка пустых полей ввода", async ({ page }) => {
        await expect(page.getByPlaceholder("name@example.com")).toHaveValue("");
        await expect(page.locator("#floatingPassword")).toHaveValue("");
    });

    test("Проверка надписи «Ошибка входа» и рамки красного цвета", async ({page}) => {
        await page.locator("#floatingInput").fill("victoria@");
        await page.locator("[name='floatingPassword']").fill("123456789");
        await page.locator(".w-100.btn.btn-lg.btn-primary").click();

        const errorMessage = page.getByRole("alert");
        await expect(errorMessage).toHaveCSS("background-color", "rgb(246, 226, 225)");

        await page.reload();
        await expect(errorMessage).not.toBeVisible();
    });

    test("проверка ахода через Яндекс и возврат", async ({ page }) => {
        await page.locator("[href='/login/oauth2/ya/redirect']").click();
        expect(page.url()).toContain('passport.yandex.ru');
        await page.goBack();
    });

    test("Изменение текстовых элементов на английский язык", async ({page}) => {
        await page.locator(".dropdown-toggle").click();
        await page.getByText("English").click();
        const login = page.locator(".h4.mb-3.fw-normal");
        const email = page.locator("[for='floatingInput']");
        const password = page.locator("[for='floatingPassword']");
        const button = page.locator(".w-100.btn.btn-lg.btn-primary");
        const or = page.locator(".text-sm.text-center");
        const yandex = page.locator("[href='/login/oauth2/ya/redirect']")
        const vk = page.locator("[href='/login/oauth2/vk/redirect']")
        const lang = page.locator("[class='d-inline-block me-2']")

        await expect(login).toHaveText("Login");
        await expect(email).toHaveText('User email');
        await expect(password).toHaveText('Password');
        await expect(button).toHaveText("Enter");
        await expect(or).toHaveText(" or login with ");
        await expect(yandex).toHaveText("Sign in with Yandex ID ");
        await expect(vk).toHaveText("Sign in with VK ID ");
        await expect(lang).toHaveText(" Select Language: ");


        // Русский язык
        // await page.locator(".dropdown-toggle").click();
        // // await page.getByText("Русский").click();
        // await page.locator("[class='fw-bold']").click();

        
        // await page.reload();
        // //[class="fw-bold"]
        // await expect(login).toHaveText(" Вход в систему ");
        // await expect(email).toHaveText('Email пользователя');
        // await expect(password).toHaveText('Пароль');
        // await expect(button).toHaveText(" Войти ");
        // await expect(or).toHaveText(" или войти с помощью ");
        // await expect(yandex).toHaveText(" Войти через Яндекс ID ");
        // await expect(vk).toHaveText(" Войти через VK ID ");
        // await expect(lang).toHaveText(" Выбор языка: ");
    });
});

