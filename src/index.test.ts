import { sayHello } from '.';

describe('sayHello', () => {
  it('works', () => {
    const log = jest.spyOn(console, 'log');
    sayHello();
    expect(log).toBeCalledWith('Hello Otchy!');
  });
});
