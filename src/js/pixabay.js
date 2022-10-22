import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30790586-6bae7f271939025eeb9ff1dde';
export let page = 1;
export let query = null;
const params = `?key=${KEY}&image_type=photo&orientation=vertical&safesearch=true&per_page=40`;

export async function getPictures(newQuery) {
  if (newQuery !== query) {
    page = 1;
    query = newQuery;
  }

  const response = await axios.get(
    `${BASE_URL}${params}&q=${query}&page=${page}`
  );
  page += 1;
  return response.data;
}
