import './charInfo.scss';
import { useEffect, useState } from "react";
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const CharInfo = (props) => {



    const [char, setChar] = useState(null);


    const {loading, error, getCharacter, clearError} = useMarvelService()


   
    useEffect(() => {
        updateChar();
    }, [props.charId])
        

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }
        clearError()
        getCharacter(charId)
            .then(res => {
                onCharLoaded(res);
            })
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }







        const skeleton = char || loading || error?  null : <Skeleton/> 
        const errorMessage = error ? <ErrorMessage/> : null; 
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;


        return (
            <div className="char__info">
             {skeleton}
             {errorMessage}
             {spinner}
             {content}
            </div>
        )


        }

const View = ({ char }) => {
    const {name,
        description,
        thumbnail,
        homepage,
        wiki,
        comics} = char

        const notAvailableImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
        const imageStyle = char.thumbnail === notAvailableImage ? { objectFit: 'contain' } : {};

    return (
        <>
                        <div className="char__basics">
                    <img style={imageStyle} src={thumbnail} alt={name} />
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
               </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? 
                    
                    
                    comics.map((item, i) => {
                        return (
                            <li key={i} className="char__comics-item">
                               <NavLink to={`/comics/${item.id}`}>{item.name}</NavLink>          
                            </li>
                        )
                    }) : "NO COMICS"
                    }

                </ul>

        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;