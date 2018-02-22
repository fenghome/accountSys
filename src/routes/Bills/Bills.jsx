import React,{Component} from 'react';

class Bills extends Component{

  render(){
    const {children} = this.props;
    return (
      <div>
        Bills
        {children}
      </div>
    )
  }
}

export default Bills;
