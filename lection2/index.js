const func = () => {
  const sum = (a, b) => a + b;
  let x = 10;
  let y = 20;

  console.log(sum(x, y)); // 30
  /* eslint-disable no-debugger */
  debugger;
  /* eslint-enable no-debugger */
  x = 20;
  y = 30;

  console.log(sum(x, y)); // 50
};

func();
