import React from 'react';
import styled from 'styled-components';
import { IconContext } from 'react-icons/lib';
import * as AiIcons from 'react-icons/ai';

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 20; /* Ensure it's above the overlay */
  padding: 20px;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const CloseIcon = styled(AiIcons.AiOutlineClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${({ sidebar }) => (sidebar ? '1' : '0')};
  visibility: ${({ sidebar }) => (sidebar ? 'visible' : 'hidden')};
  transition: opacity 350ms, visibility 350ms;
  z-index: 10; /* Ensure it's below the sidebar */
`;

const FilterForm = styled.form`
  display: flex;
  flex-direction: column;
  color: #fff;

  label {
    margin: 10px 0 5px;
  }

  select, input[type="date"], input[type="checkbox"] {
    padding: 8px;
    margin-bottom: 15px;
    border: none;
    border-radius: 4px;
  }
`;

const Sidebar = ({ sidebar, showSidebar, handleFilterChange, filters }) => {
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Overlay sidebar={sidebar} onClick={showSidebar} />
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <CloseIcon onClick={showSidebar} />
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
            </FilterForm>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;



// import React from 'react';
// import styled from 'styled-components';
// import { IconContext } from 'react-icons/lib';
// import * as AiIcons from 'react-icons/ai';

// const SidebarNav = styled.nav`
//   background: #15171c;
//   width: 250px;
//   height: 100vh;
//   position: fixed;
//   top: 0;
//   left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
//   transition: 350ms;
//   z-index: 20; /* Ensure it's above the overlay */
//   padding: 20px;
// `;

// const SidebarWrap = styled.div`
//   width: 100%;
// `;

// const CloseIcon = styled(AiIcons.AiOutlineClose)`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   cursor: pointer;
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   opacity: ${({ sidebar }) => (sidebar ? '1' : '0')};
//   visibility: ${({ sidebar }) => (sidebar ? 'visible' : 'hidden')};
//   transition: opacity 350ms, visibility 350ms;
//   z-index: 10; /* Ensure it's below the sidebar */
// `;

// const FilterForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   color: #fff;

//   label {
//     margin: 10px 0 5px;
//   }

//   select, input[type="date"], input[type="checkbox"] {
//     padding: 8px;
//     margin-bottom: 15px;
//     border: none;
//     border-radius: 4px;
//   }
// `;

// const Sidebar = ({ sidebar, showSidebar, handleFilterChange, filters }) => {
//   return (
//     <>
//       <IconContext.Provider value={{ color: '#fff' }}>
//         <Overlay sidebar={sidebar} onClick={showSidebar} />
//         <SidebarNav sidebar={sidebar}>
//           <SidebarWrap>
//             <CloseIcon onClick={showSidebar} />
//             <FilterForm onChange={handleFilterChange}>
//               <label>Severity Levels</label>
//               <label>
//                 <input type="checkbox" name="severity" value="low" checked={filters.severity.includes('low')} />
//                 Low
//               </label>
//               <label>
//                 <input type="checkbox" name="severity" value="medium" checked={filters.severity.includes('medium')} />
//                 Medium
//               </label>
//               <label>
//                 <input type="checkbox" name="severity" value="high" checked={filters.severity.includes('high')} />
//                 High
//               </label>
//               <label>
//                 <input type="checkbox" name="severity" value="critical" checked={filters.severity.includes('critical')} />
//                 Critical
//               </label>
//               <br />
//               <br />
//               <label htmlFor="dateRange">Date Range</label>
//               <select name="dateRange" id="dateRange" value={filters.dateRange}>
//                 <option value="day">Day</option>
//                 <option value="week">Week</option>
//                 <option value="month">Month</option>
//                 <option value="year">Year</option>
//                 <option value="custom">Custom</option>
//               </select>
//               {filters.dateRange === 'custom' && (
//                 <>
//                   <label htmlFor="startDate">Start Date</label>
//                   <input type="date" name="startDate" id="startDate" value={filters.startDate} />
//                   <label htmlFor="endDate">End Date</label>
//                   <input type="date" name="endDate" id="endDate" value={filters.endDate} />
//                 </>
//               )}
//             </FilterForm>
//           </SidebarWrap>
//         </SidebarNav>
//       </IconContext.Provider>
//     </>
//   );
// };

// export default Sidebar;
