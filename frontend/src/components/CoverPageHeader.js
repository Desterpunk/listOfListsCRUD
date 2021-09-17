import React from 'react';
import js from '../styles/js.jpg'

const CoverPageHeader = () => {
    return (
        <header>
            <div>

            </div>
            <div>
                <span className="text-primary"> Repositorio: </span>
                <a target="blank" href="https://github.com/Desterpunk/listOfListsCRUD"><img src={js} alt="img_js" className="photo"></img></a>
            </div>
        </header>
    );
}

export default CoverPageHeader;