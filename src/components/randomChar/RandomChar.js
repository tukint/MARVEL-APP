import { useEffect, useState } from "react";
import Spinner from '../spinner/Spinner';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';



const RandomChar = () => {

    const marvelService = new MarvelService()

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const onCharLoaded = (char) => {
        setLoading(false);
        setChar(char);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    useEffect(() => {
        updateChar();
    }, [])




    const updateChar = (retryCount = 0) => {
        const id = Math.floor(Math.random() * (1011400 - 1009149) + 1009149);
        onCharLoading()
        marvelService.getCharacter(id)
            .then(res => onCharLoaded(res))
            .catch(error => {
                console.log(error);
                if (retryCount < 10) {
                    updateChar(retryCount + 1);
                }
                else {
                    onError()
                }
            });
    }








    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={() => this.updateChar(0)} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    const notAvailableImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    const imageStyle = char.thumbnail === notAvailableImage ? { objectFit: 'contain' } : {};
    return (

        <div className="randomchar__block">
            <img src={thumbnail} style={imageStyle} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description} </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>

    )
}



export default RandomChar;