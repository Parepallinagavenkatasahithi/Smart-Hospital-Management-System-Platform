import { add, subtract, multiply, divide } from '../src/mathUtils';

describe('Math Utilities API', () => {
  it('should successfully add', () => { expect(add(2, 3)).toBe(5); });
  it('should successfully subtract', () => { expect(subtract(5, 3)).toBe(2); });
  it('should successfully multiply', () => { expect(multiply(4, 3)).toBe(12); });
  it('should successfully divide', () => { expect(divide(10, 2)).toBe(5); });
});
