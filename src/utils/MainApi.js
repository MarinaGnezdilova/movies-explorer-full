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

    register(name, email, password) {
        return fetch( `${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }), 
        }).then(this._checkResponse);
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }), 
        }).then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
          },
        }).then(this._checkResponse);
      }

    editUserInfo(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
          }),
        }).then(this._checkResponse);
      }
    
      saveMovie(movie) {
        return fetch( `${this._baseUrl}/movies`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              nameRU: movie.nameRU, 
              nameEN: movie.nameEN,
              country: movie.country,
              director: movie.director, 
              duration: movie.duration, 
              year: movie.year, 
              description: movie.description, 
              image: `https://api.nomoreparties.co${movie.image.url}`,  
              trailerLink: movie.trailerLink, 
              thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`, 
              id: `${movie.id}`,
             }), 
        }).then(this._checkResponse);
    }

    deleteMovie(id) {
      return fetch(`${this._baseUrl}/movies/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        },
      }).then(this._checkResponse);
    }

    getMovies() {
      return fetch(`${this._baseUrl}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        },
      }).then(this._checkResponse);
    }

}

export const mainApi = new Api(
  "http://84.252.137.13"
  );
  