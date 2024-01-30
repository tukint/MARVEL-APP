import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import React, { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import './SingleCharPage.scss';


const SingleCharPage = () => {
    const {charId} = useParams();
    const [SingleChar, setSingleChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [charId])

    const updateComic = () => {
        clearError();
        console.log(charId);
        getCharacter(charId)
            .then(onComicLoaded)
            .then(setTimeout(console.log('SingleChar', SingleChar), 13000))
    }

    const onComicLoaded = (comic) => {
        setSingleChar(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !SingleChar) ? <View SingleChar={SingleChar}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({SingleChar}) => {
    const {name, description, thumbnail, } = SingleChar;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleCharPage;
