import React from 'react';

import { config } from '../../config';

const index = () => {
    return (
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright &copy; {config.app_name} 2022</span>
                </div>
            </div>
        </footer>
    );
};

export default index;
