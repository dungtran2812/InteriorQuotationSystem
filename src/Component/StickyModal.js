import React from 'react';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { useNavigate, useLocation } from 'react-router-dom';

export default function StickyModal() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        // Check if the current location is already 'quotepage'
        if (location.pathname !== '/quotepage') {
            navigate('/quotepage');
        }
    };

    return (
        <div className='sticky-item' onClick={handleClick}>
            <RequestQuoteIcon sx={{marginRight:'10px'}}/>
            <h5>Nhận Báo Giá</h5>
        </div>
    );
}
