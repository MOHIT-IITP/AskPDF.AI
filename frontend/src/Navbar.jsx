import React from 'react';

const Navbar = () => {
    return (
        <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '1rem', 
            background: '#222', 
            color: '#fff' 
        }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>AskPDF.AI</div>
            <ul style={{ 
                listStyle: 'none', 
                display: 'flex', 
                gap: '1rem', 
                margin: 0, 
                padding: 0 
            }}>
                <li><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;