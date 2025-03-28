import { HttpAdapter } from "../httpAdapter";

describe('HttpAdapter', () => {
  const baseUrl = 'http://test.com/api';
  const apiKey = 'test-api-key';
  const headers = { 'X-Custom-Header': 'custom-value' };

  let httpAdapter: HttpAdapter;
  let fetchMock: jest.SpyInstance;

  beforeEach(() => {
    httpAdapter = new HttpAdapter(baseUrl, apiKey, headers);
    fetchMock = jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  it('constructs with correct baseUrl, apiKey, and headers', () => {
    expect((httpAdapter as any).baseUrl).toBe(baseUrl);
    expect((httpAdapter as any).apiKey).toBe(apiKey);
    expect((httpAdapter as any).headers).toEqual({
      'Content-Type': 'application/json',
      'X-Custom-Header': 'custom-value',
    });
  });

  it('performs a GET request with correct URL and headers', async () => {
    const endpoint = '/data';
    const params = { param1: 'value1', param2: 123 };
    const expectedUrl = `${baseUrl}${endpoint}?key=${apiKey}&param1=value1&param2=123`;
    const mockResponse = { data: 'test data' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await httpAdapter.get(endpoint, params);

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'custom-value',
      },
    });
    expect(result).toEqual(mockResponse);
  });

  it('handles HTTP errors', async () => {
    const endpoint = '/error';
    const mockResponse = { ok: false, status: 404 };

    fetchMock.mockResolvedValueOnce(mockResponse);

    await expect(httpAdapter.get(endpoint)).rejects.toThrow('HTTP error! Status: 404');
  });

  it('handles fetch errors', async () => {
    const endpoint = '/fetch-error';
    const mockError = new Error('Fetch failed');

    fetchMock.mockRejectedValueOnce(mockError);

    await expect(httpAdapter.get(endpoint)).rejects.toThrow('Fetch failed');
  });

  it('handles empty params', async () => {
    const endpoint = '/data';
    const expectedUrl = `${baseUrl}${endpoint}?key=${apiKey}`;
    const mockResponse = { data: 'test data' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await httpAdapter.get(endpoint);

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'custom-value',
      },
    });
    expect(result).toEqual(mockResponse);
  });
});