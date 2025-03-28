import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { WithLoading } from '../hoc/WithLoading';
import { Text } from 'react-native';

describe('WithLoading HOC', () => {
  const MockComponent = ({ text }: { text: string }) => <Text>{text}</Text>;
  const WrappedComponent = WithLoading(MockComponent);

  it('renders the wrapped component when isLoading is false', () => {
    render(<WrappedComponent text="Test Text" isLoading={false} />);
    expect(screen.getByText('Test Text')).toBeTruthy();
  });

  it('renders the ActivityIndicator when isLoading is true', () => {
    render(<WrappedComponent text="Test Text" isLoading={true} />);
    expect(screen.getByTestId('activity-indicator')).toBeTruthy();
  });

  it('passes props to the wrapped component when isLoading is false', () => {
    render(<WrappedComponent text="Another Test Text" isLoading={false} />);
    expect(screen.getByText('Another Test Text')).toBeTruthy();
  });

  it('applies the correct props to ActivityIndicator', () => {
    render(<WrappedComponent text="Test Text" isLoading={true} />);
    const indicator = screen.getByTestId('activity-indicator');
    expect(indicator.props.size).toBe('large');
    expect(indicator.props.color).toBe('blue');
  });
});