class Api {
    constructor(baseUrl) {
      this._baseUrl = baseUrl;
    }
    _checkResponse(res) {
      if (res.ok) {
        const data = res.json();
        return data;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    getFilms() {
        return fetch(`${this._baseUrl}`,  {
          headers: {
               'Content-Type': 'application/json'
          },
        }).then(this._checkResponse);
      }
    
}  

export const api = new Api(
    "https://api.nomoreparties.co/beatfilm-movies"
  );
  