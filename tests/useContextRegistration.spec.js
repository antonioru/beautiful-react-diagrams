import { useNodeRegistration, usePortRegistration } from '../dist/shared/internal_hooks/useContextRegistration';

// TODO: test this hook
describe('useNodeRegistration hook', () => {
  it('should be a function', () => {
    expect(useNodeRegistration).to.be.a('function');
  });
});

// TODO: test this hook
describe('usePortRegistration hook', () => {
  it('should be a function', () => {
    expect(usePortRegistration).to.be.a('function');
  });
});
