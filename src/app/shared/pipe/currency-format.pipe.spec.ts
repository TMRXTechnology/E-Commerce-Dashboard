import { CurrencyFormatPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a number into a currency string', () => {
    const value = 123456.78;
    const result = pipe.transform(value);
    expect(result).toEqual('R$ 123.456,78');
  });

  it('should handle NaN and return an empty string', () => {
    const value = NaN;
    const result = pipe.transform(value);
    expect(result).toEqual('');
  });

  // Adicione mais casos de teste conforme necessário
});
