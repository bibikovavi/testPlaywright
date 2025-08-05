import { test, expect } from "@playwright/test"

test.describe("First test suite", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("/")
    });

    test("Проверка главной странички", async ({ page }) => {
        // await page.goto("/");

        // const locator = page.locator(".navbar-nav a[href='/']");
        const loc = page.getByText("Home");
        await expect(locator).toHaveCSS("color", "rgb(255, 165, 0)");

    });

    test("verify contact us form submition", async ({page}) => {
        // await page.goto("/");
        await page.getByText("Contact us").click();
        await page.getByPlaceholder("Name").fill("my name");
        await page.locator("input[data-qa='email']").fill("myemail@email.com");
        await page.locator("#message").fill("here is my message");

        page.on("dialog", async (win) => {
            await win.accept();
        });
        await page.locator("input[data-qa='submit-button']").click();

        const divText = page.locator(".contact-form .status");
        // console.log(divText);
        await expect(divText).toBeVisible();
        await expect(divText).toHaveText("Success!...");
    });

    test("verify categories on products page", async ({page}) => {
        const result = ["WOMWEN", "MEN", "KIDS"];

        await page.getByText("Products").click();
        const data = await page.locator("[data-parent='#accordian']").allInnerTexts();
        expect(data).toEqual(result);

    });
});



/// asynchronousMethod