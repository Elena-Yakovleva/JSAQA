const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { randomNumber, clickElement, isElementVisible,} = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
  this.page2 = this.page2;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru/client${string}`, { setTimeout: 20000,});
});

When("user chooses a random date", async function () {
  const navDay = await this.page.$$(".page-nav__day");
  const randomDayIndex = await randomNumber(navDay.length);
  await navDay[randomDayIndex].click();
 
});
When("user chooses a random time", async function () {
  let availableTime = await this.page.$$(".movie-seances__time:not(.acceptin-button-disabled)");
  while (availableTime.length === 0) {
    await this.nav[1].click();
    availableTime = await this.page.$$(".movie-seances__time:not(.acceptin-button-disabled)");
  }
  const randomTime = await randomNumber(availableTime.length);
  await availableTime[randomTime].click();
});

Then("user sees page hall", async function () {
  await this.page.waitForSelector(".buying-scheme__wrapper");
});

Then("page URL matches the expected one", async function () {
  const expectedUrl = `https://qamid.tmweb.ru/client/hall.php`;
  const actualUrl = await this.page.url();
  expect(actualUrl).contain(expectedUrl);
});

Then("user takes a screenshot of the page", async function () {
  await this.page.screenshot({ path: "img/pageClientHall.png" });
});

// 
Given("user is on {string} page site", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru/client${string}`, { setTimeout: 20000, });
});

When("user chooses a random date film", async function () {
  const navDay = await this.page.$$(".page-nav__day");
  const randomDayIndex = await randomNumber(navDay.length);
  await navDay[randomDayIndex].click();
});
When("chooses a random time", async function () {
  let availableTime = await this.page.$$(".movie-seances__time:not(.acceptin-button-disabled)");
  while (availableTime.length === 0) {
    await this.nav[1].click();
    availableTime = await this.page.$$(".movie-seances__time:not(.acceptin-button-disabled)");
  }
  const randomTime = await randomNumber(availableTime.length);
  await availableTime[randomTime].click();
});

When("sees page hall", async function () {
  await this.page.waitForSelector(".buying-scheme__wrapper");
});

When("user has selected an empty seat in the hall", async function () {
  const availableSeats = await this.page.$$(".buying-scheme__wrapper .buying-scheme__chair:not(.buying-scheme__chair_disabled)");
  const randomSeatIndex = await randomNumber(availableSeats.length);
  await availableSeats[randomSeatIndex].click();
  await clickElement(this.page, ".acceptin-button");
});

When("confirmed the purchase", async function () {
  await this.page.waitForSelector(".ticket__info");
  await clickElement(this.page, ".acceptin-button");
});

Then("user saw the ticket page", async function () {
  await this.page.waitForSelector(".ticket__info-wrapper");
});

Then("page URL matches the expected one result", async function () {
  const expectedUrl = "https://qamid.tmweb.ru/client/ticket.php";
  const actualUrl = await this.page.url();
  expect(actualUrl).contain(expectedUrl);
});

Then("QR code is available on the page", async function () {
  const qrCodeVisible = await isElementVisible(this.page, ".ticket__info-qr");
  expect(qrCodeVisible).to.be.true;
});

Then("user takes a screenshot of this the page", async function () {
  await this.page.screenshot({ path: "img/pageTicket.png" });
});

Given(
  "user is on {string} page of the cinema website", async function (string) {
    return await this.page.goto(`https://qamid.tmweb.ru/client${string}`, { setTimeout: 20000,});
  }
);

When(
  "user has registered a ticket for a certain place",async function () {
    await clickElement(this.page, "nav a:nth-child(2)");
    await clickElement(this.page, "[data-seance-id='223']");
    await this.page.waitForSelector(".buying-scheme");
    await clickElement(this.page, ".buying-scheme__row:nth-child(3) > .buying-scheme__chair_standart:nth-of-type(9)");
    await clickElement(this.page, ".acceptin-button");
    await this.page.waitForSelector(".ticket__info");
    await clickElement(this.page, ".acceptin-button");
    await this.page.waitForSelector(".ticket__info-wrapper");
});

When(
  "same user tries to re-purchase a ticket for same location", async function () {
    this.page2 = await this.browser.newPage();
    await this.page2.goto("https://qamid.tmweb.ru/client/index.php");
    await clickElement(this.page2, "nav a:nth-child(2)");
    await clickElement(this.page2, "[data-seance-id='223']");
    await this.page2.waitForSelector(".buying-scheme");
    await clickElement(this.page2, ".buying-scheme__row:nth-child(3) > .buying-scheme__chair_standart:nth-of-type(9)");
});

Then("system should  show that booking button is not active", async function () {
  const button = await this.page2.$(".acceptin-button");
  const buttonDisabled = await this.page2.evaluate((button) => button.disabled, button);
  expect(true).equals(buttonDisabled);

});

Then("take screenshot this page", async function () {
  await this.page2.screenshot({ path: "img/buttonIsDisabledClientPage.png" });
});