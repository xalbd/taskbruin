const fetcher = async (endpoint: string) => {
  const response = await fetch(endpoint);
  const json = await response.json();
  if (response.ok) {
    return json;
  } else {
    throw json;
  }
};

export default fetcher;
