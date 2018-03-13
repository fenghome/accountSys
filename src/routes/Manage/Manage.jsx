import React,{Component} from 'react';

class Manage extends Component{
  render(){
    const {children} = this.props;
    return (
      <div>
        {children}
      </div>
    )
  }
}

export default Manage;
