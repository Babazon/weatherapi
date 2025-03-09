type HttpHeaders = Record<string, string>;

export class HttpAdapter {
  private baseUrl: string;
  private apiKey: string;
  private headers: HttpHeaders;

  constructor(baseUrl: string, apiKey: string, headers: HttpHeaders = {}) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.headers = {
      'Content-Type': 'application/json',
      ...headers,
    };
  }

  async get<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
    const queryParams = new URLSearchParams({
      key: this.apiKey,
      ...params,
    });

    const url = `${this.baseUrl}${endpoint}?${queryParams.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error('Error in GET request:', error);
      throw error;
    }
  }
}