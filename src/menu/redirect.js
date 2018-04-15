import {getMenuData} from "./menu";
import React from 'react';
import {Redirect,} from 'react-router-dom'
/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = (item) => {
    if (item && item.children) {
        if (item.children[0] && item.children[0].path) {
            redirectData.push({
                from: `/${item.path}`,
                to: `/${item.children[0].path}`,
            });
            item.children.forEach((children) => {
                getRedirect(children);
            });
        }
    }
};
getMenuData().forEach(getRedirect);

export const redirectDom = redirectData.map(item =>
    <Redirect key={item.from} exact from={item.from} to={item.to}/>
)
