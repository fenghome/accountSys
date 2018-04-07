import React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
const BreadcrumbItem = Breadcrumb.Item;

function BreadList({ dispatch, storage: { breadcrumbItems } }) {

  function onClick(pageType){
    dispatch({
      type:'storage/changePageType',
      payload:pageType
    })
  }

  return (
    <Breadcrumb>
      {
        breadcrumbItems.map(([text,pageType],index) => (
          <BreadcrumbItem key={index}>
            <a onClick={()=>onClick(pageType)}>{text}</a>
          </BreadcrumbItem>
        ))
      }

    </Breadcrumb>
  )
}

function mapStateToProps(state) {
  return { storage: state.storage };
}

export default connect(mapStateToProps)(BreadList);

