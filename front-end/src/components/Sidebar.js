import React from 'react';
import styled from 'styled-components';
import { IconContext } from 'react-icons/lib';

const SidebarNav = styled.nav`
  background: white; /* Changed to white background */
  width: 180px;
  height: calc(100vh - 670px); /* Adjust height to not cover the header */
  position: fixed;
  top: 150px; /* Adjusted to ensure it does not cover the header */
  left: ${({ sidebar }) => (sidebar ? '0' : '-250px')}; /* Slide-in effect */
  transition: 350ms;
  z-index: 20; /* Ensure it's above the table */
  padding: 25px;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const FilterForm = styled.form`
  display: flex;
  flex-direction: column;
  color: #333; /* Changed text color to black to match the new white background */

  label {
    margin: 10px 0 5px;
  }

  select, input[type="date"], input[type="checkbox"] {
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ddd; /* Add border to inputs for better visibility on white background */
    border-radius: 4px;
  }
`;

const Sidebar = ({ sidebar, showSidebar, handleFilterChange, filters }) => {
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <FilterForm onChange={handleFilterChange}>
              <label>Severity Levels</label>
              <label>
                <input type="checkbox" name="severity" value="low" checked={filters.severity.includes('low')} />
                Low
              </label>
              <label>
                <input type="checkbox" name="severity" value="medium" checked={filters.severity.includes('medium')} />
                Medium
              </label>
              <label>
                <input type="checkbox" name="severity" value="high" checked={filters.severity.includes('high')} />
                High
              </label>
              <label>
                <input type="checkbox" name="severity" value="critical" checked={filters.severity.includes('critical')} />
                Critical
              </label>
              <br />
              <br />
              <label htmlFor="dateRange">Date Range</label>
              <select name="dateRange" id="dateRange" value={filters.dateRange}>
                <option value="all">Default</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
                <option value="custom">Custom</option>
              </select>
              {filters.dateRange === 'custom' && (
                <>
                  <label htmlFor="startDate">Start Date</label>
                  <input type="date" name="startDate" id="startDate" value={filters.startDate} />
                  <label htmlFor="endDate">End Date</label>
                  <input type="date" name="endDate" id="endDate" value={filters.endDate} />
                </>
              )}
              <br />
              <br />
              <label>Search</label>
              <input 
                type="text" 
                name="searchQuery" 
                value={filters.searchQuery} 
                onChange={handleFilterChange} 
                placeholder="Search..." 
              />
            </FilterForm>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
