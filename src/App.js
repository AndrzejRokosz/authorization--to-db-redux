import React, { Component } from 'react';
import Auth from './Auth'
import {database} from './firebaseConfig'
import UserData from './UserData';

const App = (props) => (
  <div>
  <Auth>
    <div>
     <UserData/>
    </div>
  </Auth>

  </div>

)


export default App;
