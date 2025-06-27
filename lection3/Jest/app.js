/* eslint-disable no-undef */
function sortByName(inputArray) {
    inputArray.sort(function (a, b) {
      var nameA = a.toLowerCase(),
        nameB = b.toLowerCase();
      //сортируем названия по возрастанию
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
        return 0;// значения совпадают, сортировка не происходит
    });
    return inputArray;
}

exports.sortByName = sortByName;