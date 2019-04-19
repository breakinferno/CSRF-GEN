let fizzBuzz =  require('../../build/main/index');

test('FizzBuzz test', () => {
  expect(fizzBuzz(2)).toBe('1 2 ');
  expect(fizzBuzz(3)).toBe('1 2 Fizz ');
});
