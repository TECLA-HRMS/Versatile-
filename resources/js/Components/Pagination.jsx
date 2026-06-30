import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (links.length <= 3) return null; // Don't show pagination if there's only 'Previous' and 'Next'

    return (
        <div className="apt-pagination">
            {links.map((link, key) => {
                let label = link.label;
                if (label.includes('Previous')) {
                    label = '<i class="ri-arrow-left-s-line"></i>';
                } else if (label.includes('Next')) {
                    label = '<i class="ri-arrow-right-s-line"></i>';
                }

                if (link.url === null) {
                    return (
                        <span 
                            key={key} 
                            className="apt-page-btn disabled" 
                            dangerouslySetInnerHTML={{ __html: label }}
                        ></span>
                    );
                }

                return (
                    <Link 
                        key={key} 
                        className={`apt-page-btn ${link.active ? 'active' : ''}`} 
                        href={link.url} 
                        dangerouslySetInnerHTML={{ __html: label }} 
                    />
                );
            })}
        </div>
    );
}
