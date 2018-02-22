import React,{Component} from 'react';

class Manage extends Component{
  render(){
    const {children} = this.props;
    return (
      <div>
        Manage
        {children}
      </div>
    )
  }
}

export default Manage;
