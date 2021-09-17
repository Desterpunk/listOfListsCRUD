import React from 'react';
import js from '../styles/js.jpg'

const CoverPageHeader = () => {
    return (
        <header>
            <div>
                <a target="blank" href="https://github.com/Desterpunk"><img src={js} alt="img_js" className="photo"></img></a>
            </div>
            <nav className="menu">
                <a target="blank" href="https://github.com/Desterpunk/listOfListsCRUD">Repositorio</a>
            </nav>
        </header>
    );
}

export default CoverPageHeader;