
const { expect } = require("chai");
const { randomNumber, clickElement, isElementVisible } = require("./lib/commands");

let page;

beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(30000);
});

afterEach(async () => {
  page.close();
}),
describe("Book a seat in the movie viewing app", () => {
    beforeEach(async () => {
      await page.goto("https://qamid.tmweb.ru/client/index.php");
      await page.waitForSelector("title");
    });

    test("Successful transition to cinema's page", async () => {
      // выбор случайного дня
      const navDay = await page.$$(".page-nav__day");
      const randomDayIndex = await randomNumber(navDay.length);
      await navDay[randomDayIndex].click();
      // выбор случайного времени
      let availableTime = await page.$$(".movie-seances__time:not(.acceptin-button-disabled)");
      while (availableTime.length === 0) {
        await nav[1].click();
        availableTime = await page.$$(".movie-seances__time:not(.acceptin-button-disabled)");
      }
      const randomTime = await randomNumber(availableTime.length);
      await availableTime[randomTime].click();
      // страница зала
      await page.waitForSelector(".buying-scheme__wrapper");
      // подтверждение url страницы
      const expectedUrl = "https://qamid.tmweb.ru/client/hall.php";
      const actualUrl = await page.url();
      expect(actualUrl).contain(expectedUrl);
      //скриншот страницы
      await page.screenshot({ path: "img/pageClientHall.png" });
    });

    test("Successful registration of an electronic ticket", async () => {
      // выбор случайного дня
      const navDay = await page.$$(".page-nav__day");
      const randomDayIndex = await randomNumber(navDay.length);
      await navDay[randomDayIndex].click();
      // выбор случайного времени
      let availableTime = await page.$$(".movie-seances__time:not(.acceptin-button-disabled)");
      while (availableTime.length === 0) {
        await navDay[1].click();
        availableTime = await page.$$(".movie-seances__time:not(.acceptin-button-disabled)");
      }
      const randomTime = await randomNumber(availableTime.length);
      await availableTime[randomTime].click();
      //  выбор места в зале
      await page.waitForSelector(".buying-scheme__wrapper");
      const availableSeats = await page.$$(".buying-scheme__wrapper .buying-scheme__chair:not(.buying-scheme__chair_disabled)");
      const randomSeatIndex = await randomNumber(availableSeats.length);
      await availableSeats[randomSeatIndex].click();
      await clickElement(page, ".acceptin-button");
      // страница оплаты
      await page.waitForSelector(".ticket__info");
      await clickElement(page, ".acceptin-button");
      // страница билета
      await page.waitForSelector(".ticket__info-wrapper");
      // подтверждение url страницы
      const expectedUrl = "https://qamid.tmweb.ru/client/ticket.php";
      const actualUrl = await page.url();
      expect(actualUrl).contain(expectedUrl);
      // подтверждение наличия кода
      const qrCodeVisible = await isElementVisible(page, ".ticket__info-qr");
      expect(qrCodeVisible).to.be.true;
      // скриншот страницы
      await page.screenshot({ path: "img/pageTicket.png" });
    });

    test("Refusal  book previously registered seat", async () => {
      //оформление билета 1
      await clickElement(page, "nav a:nth-child(2)");
      await clickElement(page, "[data-seance-id='223']");
      await page.waitForSelector(".buying-scheme");
      await clickElement(page,".buying-scheme__row:nth-child(3) > .buying-scheme__chair_standart:nth-of-type(8)");
      await clickElement(page, ".acceptin-button");
      await page.waitForSelector(".ticket__info");
      await clickElement(page, ".acceptin-button");
      await page.waitForSelector(".ticket__info-wrapper");

      // повторное оформление билета на те же данные
      const page2 = await browser.newPage();
      await page2.goto("https://qamid.tmweb.ru/client/index.php");
      await clickElement(page2, "nav a:nth-child(2)");
      await clickElement(page2, "[data-seance-id='223']");
      await page2.waitForSelector(".buying-scheme");
      await clickElement(page2, ".buying-scheme__row:nth-child(3) > .buying-scheme__chair_standart:nth-of-type(8)");

      // Подтверждение того, что кнопка не активна
      const button = await page2.$(".acceptin-button");
      const buttonDisabled = await page2.evaluate((button) => button.disabled, button);
      expect(true).equals(buttonDisabled);
      // скриншот страницы
      await page2.screenshot({ path: "img/buttonIsDisabledClientPage.png" });
    });
  });