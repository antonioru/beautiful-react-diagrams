import Errors, { DiagramSchemaError } from '../dist/shared/Errors';

describe('DiagramSchemaError', () => {
  it('should create errors', () => {
    const err = new DiagramSchemaError('Foo');

    expect(err).to.be.instanceOf(Error);
  });
});

describe('Errors', () => {
  it('should be a frozen object', () => {
    expect(Errors).to.an('object');
    expect(Errors).to.be.frozen;
  });

  it('each property should return a function generating an error', () => {
    Object.values(Errors).forEach((errorGenerator) => {
      expect(errorGenerator).to.be.a('function');

      const err = errorGenerator('foo');

      expect(err).to.be.instanceOf(Error);
      expect(err).to.be.instanceOf(DiagramSchemaError);
    });
  });
});
