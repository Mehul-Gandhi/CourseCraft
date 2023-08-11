import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import '../../styles/Button.css';  // import your CSS file
import { Button as ButtonBootstrap } from 'react-bootstrap';

function Button({ onClick, icon, text, iconBefore=true }) {
    return (
        <ButtonBootstrap 
            onClick={onClick} 
            className="btn-custom d-flex align-items-center justify-content-center"
        >
            {iconBefore ? <div>{icon && <span className="mr-2">{icon}</span>}
            {text}
            </div>
             :
            <div>
            {text}
            {icon && <span className="mr-2">{icon}</span>}
            </div>
    }
        </ButtonBootstrap>
    );
}

export default Button;