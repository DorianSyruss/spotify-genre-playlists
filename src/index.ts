type JsonObject = Record<string, unknown>;

type Category = {
  href: string,
  items: JsonObject[],
  limit: number,
  offset: number,
  previous: string,
  total: number
};

const APIController = (function () {
  const clientId = 'ADD YOUR CLIENT ID';
  const clientSecret = 'ADD YOUR CLIENT SECRET';

  // private methods
  const _getToken = async ():Promise<string> => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret)
      },
      body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
  };

  const _getCategory = async (token:string):Promise<Category[]> => {
    const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await result.json();
    return data.categories;
  };

  const _getGenres = async (token:string):Promise<JsonObject[]> => {
    const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await result.json();
    return data.categories.items;
  };

  const _getPlaylistByGenre = async (token:string, genreId:number):Promise<JsonObject[]> => {
    const limit = 10;
    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await result.json();
    return data.playlists.items;
  };

  const _getTracks = async (token:string, tracksEndPoint:string):Promise<JsonObject[]> => {
    const limit = 10;
    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await result.json();
    return data.items;
  };

  const _getTrack = async (token:string, trackEndPoint:string):Promise<JsonObject> => {
    const result = await fetch(`${trackEndPoint}`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await result.json();
    return data;
  };

  return {
    getToken() {
      return _getToken();
    },
    getGenres(token:string) {
      return _getGenres(token);
    },
    _getCategory(token:string) {
      return _getCategory(token);
    },
    getPlaylistByGenre(token:string, genreId:number) {
      return _getPlaylistByGenre(token, genreId);
    },
    getTracks(token:string, tracksEndPoint:string) {
      return _getTracks(token, tracksEndPoint);
    },
    getTrack(token:string, trackEndPoint:string) {
      return _getTrack(token, trackEndPoint);
    }
  };
})();

export default APIController;
