/* eslint-disable no-undef */
const sorting = require("../app");

describe("Books names test suit", () => {
  test("Books names should be sorted in ascending order", () => {
    const input = [
      "Гарри Поттер",
      "Властелин Колец",
      "Волшебник изумрудного города",
    ];
    const expected = [
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ];
    const actual = sorting.sortByName(input);
    expect(actual).toEqual(expected);
  });
});

describe("Books names test suit", () => {
  test("Sorting books with the same names", () => {
    const input = [
      "Сказки",
      "Властелин Колец",
      "Сказки",
      "Чук и Гек"
    ];
    const expected = [
      "Властелин Колец",
      "Сказки",
      "Сказки",
      "Чук и Гек"
    ];
    
    const actual = sorting.sortByName(input);
    expect(actual).toEqual(expected);
  });
})

describe("Books names test suit", () => {
  test("Error when calling sorting without arguments", () => {
    expect(() => sorting.sortByName()).toThrow(TypeError);
  });
});

