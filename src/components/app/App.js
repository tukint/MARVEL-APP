
import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

import decoration from '../../resources/img/vision.png';

const App = () => {

    const [selectedChar, setSelectedChar] = useState(null);



   const  onCharSelected= (id) => {
             setSelectedChar(id)
    }

    return(
      <Router>
          <div className="app">
            <main>
               <Switch>
                <Route exact  path="/">
                       <AppHeader/>
                        <RandomChar/>
                        <div className="char__content">
                            <CharList onCharSelected={onCharSelected}/>
                            <CharInfo charId={selectedChar} />
                        </div>
                        <img className="bg-decoration" src={decoration} alt="vision"/> 
                    </Route>
                    <Route exact  path="/comics">
                        <AppHeader/>
                        <ComicsList/>
                    </Route>
               </Switch>
            </main>
        </div>
      </Router>
    )
}

export default App;