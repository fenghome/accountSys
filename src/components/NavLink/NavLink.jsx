import React from 'react';
import {Link} from 'dva/router';

export default function NavLink({path,text}){
  retrun (
    <Link to={path}></Link>
  )
}
