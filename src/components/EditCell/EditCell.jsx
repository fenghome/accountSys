import React from 'react';
import { Input, Icon } from 'antd';
import { editCell, textClass, iconClass, editCellUnderLine } from './index.css';
class EditCell extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editState: false,
      value: props.defaultValue || (props.type === "number" ? 0 : "")
    }
  }

  changeEdit = () => {
    this.setState({
      editState: true
    })
  }

  onOk = () => {
    const { onInputValue } = this.props;
    const { value } = this.state;
    this.setState({
      editState: false
    });
    onInputValue(value);
  }

  onChangeValue = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const { editState, value } = this.state;
    const { type, underLine = false } = this.props;

    return (
      <div>
        {
          editState ?
            <div className={editCell}>
              <Input type={type} className={textClass} value={value} onChange={this.onChangeValue} />
              <Icon className={iconClass} type="check" onClick={this.onOk} />
            </div>
            :
            <div className={!underLine ? editCell : editCellUnderLine}>
              <span className={textClass}>{value}</span>
              <Icon className={iconClass} type="edit" onClick={this.changeEdit} />
            </div>
        }
      </div>

    )
  }
}

export default EditCell;
