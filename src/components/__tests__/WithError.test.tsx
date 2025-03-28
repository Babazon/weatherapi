import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { WithError } from '../hoc/WithError';
import { Text } from 'react-native';

describe('WithError HOC', () => {
  const MockComponent = ({ text }: { text: string }) => <Text>{text}</Text>;
  const WrappedComponent = WithError(MockComponent);

  it('renders the wrapped component when isError is false', () => {
    render(<WrappedComponent text="Test Text" isError={false} />);
    expect(screen.getByText('Test Text')).toBeTruthy();
  });

  it('renders the error message when isError is true', () => {
    render(<WrappedComponent text="Test Text" isError={true} />);
    expect(screen.getByTestId('error-text')).toBeTruthy();
  });

  it('passes props to the wrapped component when isError is false', () => {
    render(<WrappedComponent text="Another Test Text" isError={false} />);
    expect(screen.getByText('Another Test Text')).toBeTruthy();
  });
});