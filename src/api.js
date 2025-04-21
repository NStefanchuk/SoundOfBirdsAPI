const pixabayKey = '49700645-d4f374e519be8f295f4111793'
const xenoCantoKey = 'fa3475b7ce34dfcbddd1547084c18233850f5abe'

export async function fetchBirdImage(query) {
  const url = `https://pixabay.com/api/?key=${pixabayKey}&q=${encodeURIComponent(query)}&image_type=photo&safesearch=true`
  const res = await fetch(url)
  const data = await res.json()
  if (data && data.hits && data.hits.length > 0) {
    return data.hits[0].webformatURL
  } else {
    return './public/images/unknownBird.png'
  }
  
}

export async function fetchBirdSounds(query, region = '') {
  let fullQuery = `en:"${query}" grp:birds`;
  if (region.trim()) {
    fullQuery += ` cnt:${region}`;
  }
  const url = `https://xeno-canto.org/api/3/recordings?query=${encodeURIComponent(fullQuery)}&key=${xenoCantoKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.recordings;
}


