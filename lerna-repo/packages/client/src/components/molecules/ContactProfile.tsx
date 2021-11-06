import React from 'react';

export const ContactProfile = () => {
    return (
        <div className="card" style={{ width: '18 rem', height: '11vh' }}>
            <div className="card-body hover-overlay ripple shadow-1-strong">
                <h5 className="card-title">Contact Name</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    self description
                </h6>
                <p className="card-text">
                    Last message sent by you or by the contact
                </p>
            </div>
        </div>
    );
};
