import React from 'react';

// Get the current year using the Date object
let year = new Date().getFullYear();

function Footer() {
    return (
        <footer>
            {/* Display copyright symbol and the current year */}
            <p>Copyright ©️ {year}</p>
        </footer>
    );
}

export default Footer;
