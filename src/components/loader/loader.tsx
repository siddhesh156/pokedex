import PropTypes from 'prop-types';
import React from 'react';
import { Loader } from 'rsuite';

const Apploader = ({ className }) => {
    return (
        <>
            <div className={className}>
                <Loader size="md" content="Loading..." />
            </div>
        </>
    );
};

Apploader.propTypes = {
    className: PropTypes.string,
};
export default Apploader;