// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import './index.css';
// import {Tree, Input} from 'antd';
// // import $ from "jquery";
// import style from "./index.css";

// class MenuPage extends React.Component {
//     constructor(props, context) {
//         super(props, context);

//         this.onMenuClicked = this.onMenuClicked.bind(this);
//     }

//     onMenuClicked(ev) {
//         // // 被点击的<h1>
//         // let node = $(ev.target);

//         // // 属于<h1>的相邻子菜单列表
//         // let subMenu = node.next();

//         // // 显示/隐藏这个列表
//         // subMenu.css("display", subMenu.css('display') == "none" ? "block" : "none");
//     }

//     /**
//      * 递归生成菜单
//      * @param menuObj
//      * @returns {Array}
//      */
//     generateMenu(menuObj) {
//         let vdom = [];
//         console.log(menuObj);

//         if (menuObj instanceof Array) {
//           console.log('是数组')
//             let list = [];
//             for (var item of menuObj) {
//                 list.push(this.generateMenu(item));
//             }

//             vdom.push(
//                 <ul key="single">
//                     {list}
//                 </ul>
//             );
//         } else {
//           console.log('不是数组')
//             vdom.push(
//                 <li key={menuObj.menuId}>
//                     <h1 onClick={this.onMenuClicked}>
//                         {menuObj.name}
//                     </h1>
//                     {this.generateMenu(menuObj.children)}
//                 </li>
//             );
//         }
//         console.log('..............')
//         console.log(vdom)
//         return vdom;
//     }

//     render() {
//         let data = [
//             {
//                 menuId: 1,
//                 name: '员工管理',
//                 children: [
//                     {
//                         menuId: 3,
//                         name: '添加员工',
//                         children: []
//                     },
//                     {
//                         menuId: 4,
//                         name: '删除员工',
//                         children: [
//                             {
//                                 menuId: 6,
//                                 name: '按姓名删除',
//                                 children: []
//                             },
//                             {
//                                 menuId: 7,
//                                 name: '按工号删除',
//                                 children: []
//                             }
//                         ]
//                     }
//                 ],
//             },
//             {
//                 menuId: 2,
//                 name: '工资管理',
//                 children: [
//                     {
//                         menuId: 5,
//                         name: '修改工资',
//                         children: []
//                     }
//                 ],
//             },
//         ];

//         return (
//             <div>
//                 {this.generateMenu(data)}
//             </div>
//         );
//     }
// }

// MenuPage.contextTypes = {
//     router: () => { React.PropTypes.object.isRequired }
// };

// ReactDOM.render(
//   <MenuPage />, document.getElementById('container'));


// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import './index.css';
// import {Tree, Input} from 'antd';
// // import $ from "jquery";
// import style from "./index.css";
// import {getMenuData} from "./menu";

// class MenuPage extends React.Component {
//     constructor(props, context) {
//         super(props, context);

//         this.onMenuClicked = this.onMenuClicked.bind(this);
//     }

//     onMenuClicked(ev) {
//         // // 被点击的<h1>
//         // let node = $(ev.target);

//         // // 属于<h1>的相邻子菜单列表
//         // let subMenu = node.next();

//         // // 显示/隐藏这个列表
//         // subMenu.css("display", subMenu.css('display') == "none" ? "block" : "none");
//     }

//     /**
//      * 递归生成菜单
//      * @param menuObj
//      * @returns {Array}
//      */
//     generateMenu(menus) {
//         let keys = [];
//         menus.forEach((item) => {
//           if (item.children) {
//             keys.push({
//               path:item.menuId,
//               title:item.name,
//             });
//             keys = keys.concat(this.generateMenu(item.children));
//           } else {
//             keys.push({
//               path:item.menuId,
//               title:item.name,
//             });
//           }
//         });
//         // console.log(keys)
//         return keys;
//     }
//     render() {

//         let data = [
//             {
//                 menuId: 1,
//                 name: '员工管理',
//                 children: [
//                     {
//                         menuId: 3,
//                         name: '添加员工',
//                         children: []
//                     },
//                     {
//                         menuId: 4,
//                         name: '删除员工',
//                         children: [
//                             {
//                                 menuId: 6,
//                                 name: '按姓名删除',
//                                 children: []
//                             },
//                             {
//                                 menuId: 7,
//                                 name: '按工号删除',
//                                 children: []
//                             }
//                         ]
//                     }
//                 ],
//             },
//             {
//                 menuId: 2,
//                 name: '工资管理',
//                 children: [
//                     {
//                         menuId: 5,
//                         name: '修改工资',
//                         children: []
//                     }
//                 ],
//             },
//         ];
// console.log(this.generateMenu(data))

//         return (
//             <div>
// sdfghjk
//             </div>
//         );
//     }
// }

// MenuPage.contextTypes = {
//     router: () => { React.PropTypes.object.isRequired }
// };

// ReactDOM.render(
//   <MenuPage />, document.getElementById('container'));


import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {Tree, Input} from 'antd';
// import $ from "jquery";
import style from "./index.css";
import {getMenuData, menuData} from "./menu/menu";

class MenuPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onMenuClicked = this.onMenuClicked.bind(this);
    }

    onMenuClicked(ev) {
        // // 被点击的<h1>
        // let node = $(ev.target);

        // // 属于<h1>的相邻子菜单列表
        // let subMenu = node.next();

        // // 显示/隐藏这个列表
        // subMenu.css("display", subMenu.css('display') == "none" ? "block" : "none");
    }

    /**
     * 递归生成菜单
     * @param menuObj
     * @returns {Array}
     */
    generateMenuData(menus) {
        let keys = [];
        menus.forEach((item) => {
          if (item.children) {
            keys.push({
              path:item.path,
              name:item.name,
              icon:item.icon,
            });
            keys = keys.concat(this.generateMenuData(item.children));
          } else {
            keys.push({
              path:item.path,
              name:item.name,
              icon:item.icon,
            });
          }
        });
        // console.log(keys)
        return keys;
    };


    geneateMenu = (data) => data.map(item=><div key={item.path}>{item.name}</div>)
    generateStackMenu = (menuObj) => {
      let vdom = [];

        if (menuObj instanceof Array) {
            let list = [];
            for (var item of menuObj) {
                list.push(this.generateStackMenu(item));
            }
            vdom.push(
                <ul key="single">
                    {list}
                </ul>
            );
        } else {
           if(menuObj){
            vdom.push(
              <li key={menuObj.path}>
                  <span onClick={this.onMenuClicked}>
                      {menuObj.name}
                  </span>
                  {this.generateStackMenu(menuObj.children)}
              </li>
          );
           }
        }
        return vdom;
    }
    render() {
      console.log(this.generateMenuData(getMenuData()))
      const data = this.generateMenuData(getMenuData());
      return (
          <div className='list-menu'>
            {/* 生成非嵌套列表 */}
            <div className='menu'>
              <div className='catalog'>非嵌套类型</div>
            {this.geneateMenu(data)}
            </div>
            {/* 生成嵌套列表 */}
            <div className='menu'>
            <div className='catalog'>嵌套类型</div>
            {this.generateStackMenu(menuData)}
            </div>

          </div>
      );
    }
}

MenuPage.contextTypes = {
    router: () => { React.PropTypes.object.isRequired }
};

ReactDOM.render(
  <MenuPage />, document.getElementById('container'));