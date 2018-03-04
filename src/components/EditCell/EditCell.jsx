import React from 'react';
import {Input, Icon} from 'antd';
import {editCell, textClass , iconClass} from './index.css';
class EditCell extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            editState:false,
            value:0,
        }
    }

    changeEdit = ()=>{
        this.setState({
            editState:true
        })
    }

    onOk = () => {
        const {onInputValue} = this.props;
        const {value } = this.state;
        this.setState({
            editState:false
        });
        onInputValue(value);
    }

    onChangeValue = (e) =>{
        this.setState({
            value:e.target.value
        })
    }

    render() {
        const {editState,value} = this.state;
        return (
            <div className={editCell}>
                {
                    editState ?
                        <div>
                            <Input className={textClass} type="number" onChange={this.onChangeValue} />
                            <Icon className={iconClass} type="check" onClick={this.onOk}/>
                        </div>
                        :
                        <div>
                            <span className={textClass}>{value}</span>
                            <Icon className={iconClass} type="edit" onClick={this.changeEdit}/>
                        </div>
                }
            </div>

        )
    }
}

export default EditCell;