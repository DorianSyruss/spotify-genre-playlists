type JsonObject = Record<string, unknown>;

export type Category = {
  href: string,
  items: JsonObject[],
  limit: number,
  offset: number,
  previous: string,
  total: number
};

interface IApiController {
  getToken(token:string):Promise<string>
  getCategory(token:string):Promise<Category[]>
  getGenres(token:string):Promise<JsonObject[]>
  getPlaylistByGenre(token:string, genreId:number):Promise<string>
  getTracks(token:string, tracksEndPoint:string):Promise<JsonObject[]>
  getTrack(token:string, trackEndPoint:string):Promise<JsonObject>
}

export default IApiController;
