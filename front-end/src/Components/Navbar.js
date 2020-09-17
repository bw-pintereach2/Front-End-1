import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return(
        <div>
            <Link to='/allListing'>All Listing</Link>
            <Link to='/myListing'>My Listing</Link>
            <Link to='/cart'>Cart</Link>
        </div>
    )
};

export default Navbar;