import React from 'react';
import './App.css';

function App() {
    return (
        <div>
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link active" href="#">
                        Active
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Link
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Link
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#">
                        Disabled
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default App;
