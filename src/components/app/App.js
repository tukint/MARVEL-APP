import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import Page404 from "../404/404";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleComic from "../singleComic/SingleComic";
import SingleCharPage from "../SingleCharPage/SingleCharPage";
import decoration from "../../resources/img/vision.png";
import CharSearchForm from "../FindChar/CharSearchForm";



const App = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  };
  return (
    <Router>
      <div className="app">
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AppHeader />
                  <RandomChar />
                  <div className="char__content">
                    <CharList onCharSelected={onCharSelected} />
                    <div style={{position: 'sticky', top: '2%'}}>
                    <CharInfo charId={selectedChar} />
                    <CharSearchForm/>
                    </div>
                  </div>
                  <img
                    className="bg-decoration"
                    src={decoration}
                    alt="vision"
                  />
                </>
              }
            />
            <Route
              path="/comics"
              element={
                <>
                  <AppHeader />
                  <ComicsList />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <AppHeader />
                  <div style={{ "margin-top": "100px" }}></div>
                  <Page404 />
                </>
              }
            ></Route>
             <Route path="/comics/:comicId" element={
                  <>
                    <AppHeader />
                    <SingleComic />
                  </>
                } />

            <Route path="/:charId" element={
                  <>
                    <AppHeader />
                    <SingleCharPage />
                  </>
                } />
          </Routes>
        
          
        </main>
      </div>
    </Router>
  );
};

export default App;
