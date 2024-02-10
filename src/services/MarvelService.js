import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const  _apiKey = 'apikey=f0af771475f613338424f9125c4d5337';
    const _baseOffset = 127;


    const getAllCharacters = async (offset = _baseOffset) => {
        console.log('what the fuck', `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformCharacter);
	};

   const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return  _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = (char) => {

        let character = char 

        if (!character.description) {
            character.description = 'No Data for this character'
        }



        if(character.comics.items.length > 10) {
            character.comics.items = character.comics.items.slice(0,10)
        }

        

       character.comics.items = character.comics.items.map(item => {
        const parts = item.resourceURI.split('/');
        const id = parts[parts.length - 1];
        return {
            ...item,
            id, 
        };
    });


        return {
            id:character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items,
        }
    }


    const getAllComics = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};


    const getComics = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return   res.data.results.map(_transformComics);
	};

    const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        console.log('my res for char', res);
		return res.data.results.map(_transformCharacter);
	};




    
    const _transformComics = (magazine) => {

        let comics = magazine 

        return {
            id:comics.id,
            title: comics.title,
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            homepage: comics.urls[0].url,
            price: comics.prices[0].price,
            description: comics.description,
            pages: comics.pageCount,

        }
    }


    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComics, getCharacterByName}
}

export default useMarvelService