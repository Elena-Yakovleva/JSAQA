import { test, expect } from "@playwright/test";
import { email, password, incorrectEmail, incorrectPassword} from "../user";

test("authorization completed", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Пароль" }).click();
  await page.getByRole("textbox", { name: "Пароль" }).fill(password);
  await page.getByTestId("login-submit-btn").click();

  await expect(page.url()).toContain("https://netology.ru/profile/");
  const heading = "Моё обучение";  // const heading = page.getByRole("heading", { name: "Моё обучение" });
  await expect(page.locator("h2")).toContainText(heading);  // await expect(heading).toBeVisible();

  await page.screenshot({
    path: "img/screenshot-profile-page.png",
  });
});

test("authorization denied", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(incorrectEmail);
  await page.getByRole("textbox", { name: "Пароль" }).click();
  await page.getByRole("textbox", { name: "Пароль" }).fill(incorrectPassword);
  await page.getByTestId("login-submit-btn").click();
  
  const messageError = page.getByTestId('login-error-hint');
  await expect(messageError).toBeVisible();
  await expect(messageError).toContainText("Вы ввели неправильно логин или пароль.");

  await page.screenshot({
    path: "img/screenshot-denied-auth.png",
  });
});
