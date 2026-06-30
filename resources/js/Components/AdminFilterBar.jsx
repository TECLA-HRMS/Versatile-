import React, { useState, useEffect } from 'react';

/**
 * A reusable Admin Filter Bar with advanced options.
 * 
 * @param {string} searchPlaceholder - Placeholder for the main search input.
 * @param {object} currentFilters - The current filter values from the URL/State.
 * @param {array} advancedFilters - Array of filter definitions [{ name: 'status', label: 'Status', type: 'select', options: [{value: '1', label: 'Active'}] }]
 * @param {function} onFilter - Callback when filters are applied (receives updated filter object).
 */
export default function AdminFilterBar({ 
    searchPlaceholder = "Search...", 
    currentFilters = {}, 
    advancedFilters = [], 
    onFilter 
}) {
    const [filters, setFilters] = useState(currentFilters);

    // Sync state if props change
    useEffect(() => {
        setFilters(currentFilters);
    }, [currentFilters]);

    const handleSearchChange = (e) => {
        setFilters({ ...filters, search: e.target.value });
    };

    const handleFilterChange = (name, value) => {
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = (e) => {
        if (e) e.preventDefault();
        onFilter(filters);
    };

    const clearFilters = () => {
        const cleared = {};
        onFilter(cleared);
        setFilters({});
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    };

    return (
        <div className="admin-filter-bar mb-4" style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
            <div className="d-flex align-items-center gap-3 flex-wrap">
                <div className="flex-grow-1 position-relative" style={{ minWidth: '200px' }}>
                    <i className="ri-search-line position-absolute" style={{ top: '50%', transform: 'translateY(-50%)', left: '14px', color: '#64748b' }}></i>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder={searchPlaceholder} 
                        value={filters.search || ''}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        style={{ paddingLeft: '40px', borderRadius: '6px', border: '1px solid #cbd5e1', boxShadow: 'none' }}
                    />
                </div>
                
                {advancedFilters.map((filter, idx) => (
                    <div key={idx} style={{ minWidth: '150px' }}>
                        {filter.type === 'select' && (
                            <select 
                                className="form-select" 
                                value={filters[filter.name] || ''}
                                onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                                style={{ borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            >
                                <option value="">{filter.label}</option>
                                {filter.options.map((opt, oIdx) => (
                                    <option key={oIdx} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        )}

                        {filter.type === 'date' && (
                            <input 
                                type="date" 
                                className="form-control" 
                                value={filters[filter.name] || ''}
                                onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                                style={{ borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            />
                        )}
                    </div>
                ))}
                
                <button type="button" className="btn btn-primary px-4" onClick={applyFilters} style={{ borderRadius: '6px', fontWeight: '500' }}>
                    Filter
                </button>

                <button type="button" className="btn btn-outline-secondary px-3" onClick={clearFilters} style={{ borderRadius: '6px', fontWeight: '500' }}>
                    Clear
                </button>
            </div>
        </div>
    );
}
