import React, { useState } from 'react';
import Day from './Tracker/Day';
import moment from 'moment';
import DaySwitcher from './Tracker/DaySwitcher';
import RankDayListItem from './Rank/RankDayListItem';
import { NavLink, Switch, Route, Redirect, Link } from 'react-router-dom';

function App() {
   const [day, setDay] = useState(moment());
   return (
      <div className="flex">
         <div className="w-48 bg-gray-100 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row sm:justify-around">
               <div className="w-72 h-screen">
                  <nav className="mt-10 px-6 ">
                     <div className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors duration-200  text-gray-800  rounded-lg">
                        <NavLink
                           exact={true}
                           to="/"
                           activeClassName="bg-red-200"
                           className="mx-4 text-lg font-normal">
                           Home
                        </NavLink>

                        <span className="flex-grow text-right"></span>
                     </div>
                     <div className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors duration-200  text-gray-800  rounded-lg">
                        <Link
                           to="/matches"
                           className="mx-4 text-lg font-normal">
                           Matches
                        </Link>
                        <span className="flex-grow text-right"></span>
                     </div>
                  </nav>
               </div>
            </div>
         </div>

         <div className="mx-auto w-full px-24">
            <Switch>
               <Route exact path="/matches">
                  <DaySwitcher
                     onClickLeft={() =>
                        setDay((d) => moment(d).subtract(1, 'day'))
                     }
                     onClickRight={() => setDay((d) => moment(d).add(1, 'day'))}
                     day={moment(day).format('dddd, MMMM Do YYYY')}
                  />

                  <RankDayListItem day={moment(day).format('DD-MM-YYYY')} />

                  <Day day={moment(day).format('DD-MM-YYYY')} />
               </Route>

               <Route path="*">
                  <Redirect to="/" />
               </Route>
            </Switch>
         </div>
      </div>
   );
}

export default App;
