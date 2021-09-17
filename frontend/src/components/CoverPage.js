import React from 'react';
import CoverPageBody from './CoverPageBody';
import CoverPageHeader from './CoverPageHeader';

const CoverPage = () => {
    return (
        <div className="container">
            <CoverPageHeader/>
            <CoverPageBody/>
        </div>
    );
}

export default CoverPage;