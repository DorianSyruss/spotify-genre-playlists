import IApiController from './Interfaces/APIController';

class ApiController implements IApiController {
  #clientId;
  #clientSecret;

  constructor(clientId:string, clientSecret:string) {
    this.#clientId = clientId;
    this.#clientSecret = clientSecret;
  }

  async getToken() {
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(this.#clientId + ':' + this.#clientSecret)
      },
      body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
  }

  async getCategory(token:string) {
    const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await result.json();
    return data.categories;
  }

  async getGenres(token:string) {
    const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await result.json();
    return data.categories.items;
  }

  async getPlaylistByGenre(token:string, genreId:number) {
    const limit = 10;
    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await result.json();
    return data.playlists.items;
  }

  async getTracks(token:string, tracksEndPoint:string) {
    const limit = 10;
    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await result.json();
    return data.items;
  }

  async getTrack(token:string, trackEndPoint:string) {
    const result = await fetch(`${trackEndPoint}`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await result.json();
    return data;
  }
}

export default ApiController;
