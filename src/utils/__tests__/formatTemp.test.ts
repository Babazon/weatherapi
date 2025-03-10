import { formatTemp } from "../formatTemp";

describe('formatTemp', () => {
  it('returns an empty string when temp is undefined', () => {
    expect(formatTemp(undefined)).toBe('');
  });

  it('returns an empty string when temp is null', () => {
    expect(formatTemp(null)).toBe('');
  });

  it('formats a number correctly', () => {
    expect(formatTemp(23.456)).toBe('23°C');
  });

  it('formats a string number correctly', () => {
    expect(formatTemp('23.456')).toBe('23°C');
  });

  it('handles zero correctly', () => {
    expect(formatTemp(0)).toBe('0°C');
  });

  it('handles negative numbers correctly', () => {
    expect(formatTemp(-5.67)).toBe('-6°C');
  });
});