import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import useApiCall from '../../../src/hooks/useApiCall';

jest.mock('axios');

describe('useApiCall', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch data successfully', async () => {
    const responseData = { message: 'Data fetched successfully' };
    axios.mockResolvedValueOnce({ data: responseData });

    const { result, waitForNextUpdate } = renderHook(() =>
      useApiCall('get', 'https://example.com/api/data')
    );

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    act(() => {
      result.current.executeApi();
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.data).toEqual(responseData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('should handle error when fetching data', async () => {
    const errorMessage = 'Error getting the data';
    axios.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() =>
      useApiCall('get', 'https://example.com/api/data')
    );

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    act(() => {
      result.current.executeApi();
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error.message).toBe(errorMessage);
  });
});