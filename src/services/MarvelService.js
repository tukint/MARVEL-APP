class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=f0af771475f613338424f9125c4d5337';


    getResourses = async (url) => {
        let res;
        try {
            res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Error fetching data from ${url}. Status: ${res.status}`);
            }
            return await res.json();
        } catch (error) {
            // Handle or rethrow the error as needed
            console.error("Error in getResourses:", error);
            throw error; // Rethrowing the error if you want to handle it later in .catch()
        }
    }


    getAllCharacters = async (offset = 45) => {
        const res = await this.getResourses(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`).then();
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResourses(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return  this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {

        let character = char 

        if (!character.description) {
            character.description = 'No Data for this character'
        }

        if(character.description.length > 211) {
            character.description = character.description.slice(0,210) + '...'
        }

        if(character.comics.items.length > 10) {
            character.comics.items = character.comics.items.slice(0,10)
        }

        return {
            id:character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items
        }
    }
}

export default MarvelService