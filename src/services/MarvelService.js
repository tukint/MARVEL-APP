import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const  _apiKey = 'apikey=f0af771475f613338424f9125c4d5337';
    const _baseOffset = 210;

    // const getResourses = async (url) => {
    //     let res;
    //     try {
    //         res = await fetch(url);
    //         if (!res.ok) {
    //             throw new Error(`Error fetching data from ${url}. Status: ${res.status}`);
    //         }
    //         return await res.json();
    //     } catch (error) {
    //         // Handle or rethrow the error as needed
    //         console.error("Error in getResourses:", error);
    //         throw error; // Rethrowing the error if you want to handle it later in .catch()
    //     }
    // }


    const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformCharacter);
	};

   const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        console.log('res before transform', res);
        return  _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = (char) => {

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


    const getAllComics = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};



    
    const _transformComics = (magazine) => {

        let comics = magazine 

        return {
            id:comics.id,
            title: comics.title,
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            homepage: comics.urls[0].url,
            price: comics.prices[0].price,
        }
    }


    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics}
}

export default useMarvelService