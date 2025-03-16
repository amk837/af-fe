const objectToQueryString = (params = {}) => Object.entries(params).reduce(
  (acc, [key, value], index) => `${acc}${index > 0 ? '&' : '?'}${key}=${value}`,
  '',
);

const makeRequest = async (
  url, 
  {
    options,
    queryParams,
  } = {
    options: {
      method: 'GET',
    },
    queryParams: {},
  }
) => {
  const parsedUrl = url.startsWith('http') ? url : `${process.env.REACT_APP_API_BASE_URL}${url}`;
  const completeUrl = queryParams
    ? `${parsedUrl}${objectToQueryString(queryParams)}`
    : parsedUrl;

  const useFormData = options?.body instanceof FormData;
  try {
    const requestOptions = {
      method: 'GET',
      ...options,
      body: useFormData
        ? (options?.body)
        : JSON.stringify(options?.body),
      headers: {
        ...(useFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(options?.headers || {}),
      },
    };

    const response = await fetch(completeUrl, {
      ...requestOptions,
    });
    if (response.status >= 200 && response.status <= 399) {
      return { data: await response.json(), success: true };
    }
    const res = await response.json();
    console.log(
      `API request failed: ${response.url}. Details: ${
        JSON.stringify(res, undefined, 2)
      }`,
    );
    return { ...res, success: false };
  } catch (err) {
    return { success: false };
  }
};

export default makeRequest;
