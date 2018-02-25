import React from 'react';
import { Link } from 'dva/router';
import { Breadcrumb } from 'antd';
import {breadcrmb} from './index.css';

export default function BreadcrumbList({ breadcrumbItems }) {
    return (
        <Breadcrumb className={breadcrmb}>
            {
                breadcrumbItems.map(([text, path], index) => (
                    <Breadcrumb.Item key={index}>
                        <Link to={path}>
                            {text}
                        </Link>
                    </Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
    )
}
