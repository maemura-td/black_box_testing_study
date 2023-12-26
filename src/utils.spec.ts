import { isAdult } from './utils';

describe('utils', () => {
  describe('isAdult', () => {
    it('should throw an error if age is less than 0', () => {
      expect(() => isAdult(-1)).toThrow();
    });

    it('should return false if age is less than 18', () => {
      expect(isAdult(0)).toBe(false);
      expect(isAdult(17)).toBe(false);
    });

    it('should return true if age is greater than or equal to 18', () => {
      expect(isAdult(18)).toBe(true);
    });
  });
});