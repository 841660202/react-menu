import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index2.css';
import {getMenuData} from "./menu";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
} from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {NoMatch} from './no-match'
import {redirectDom} from './redirect'

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = (icon) => {
    if (typeof icon === 'string' && icon.indexOf('http') === 0) {
        return <img src={icon} alt="icon"/>;
    }
    if (typeof icon === 'string') {
        return <Icon type={icon}/>;
    }
    return icon;
};


function getFlatMenuData(menus) {
    let keys = {};
    menus.forEach((item) => {
        if (item.children) {
            keys[item.path] = {...item};
            keys = {...keys, ...getFlatMenuData(item.children)};
        } else {
            keys[item.path] = {...item};
        }
    });
    return keys;
}
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

class SiderDemo extends React.Component {
    constructor(props) {
        super(props);
        this.menus = getMenuData();
        this.state = {
            openKeys: localStorage.f ? [localStorage.f] : ['dashboard'],
            defaultOpenKeys: localStorage.f ? localStorage.f : 'dashboard',
            current: localStorage.z ? localStorage.z : 'dashboard/analysis',
            // openKeys: ['dashboard'],
            // defaultOpenKeys: 'dashboard',
            // current: 'dashboard/analysis',
        };
    }
    componentWillReceiveProps(nextProps) {
        // if (nextProps.location.pathname !== this.props.location.pathname) {
        //     this.setState({
        //         openKeys: this.getDefaultCollapsedSubMenus(nextProps),
        //     });
        // }
        console.log(this.props.history)
    }
    componentDidMount(){
        const lastKey = localStorage.lastKey;
        console.log(lastKey);
        
    }
    handleStoreKey = ({ item, key, keyPath }) => {
        console.log(item);
        console.log(key);
        console.log(keyPath);
        
        // localStorage.setItem('lastKey',key)
    }

    handleClick = (e) => {
        console.log('click ', e);
        const keys = e.key.split('/');
        this.setState({
          current: e.key,
          defaultOpenKeys: keys[0],
        });
        localStorage.setItem('f',keys[0]);
        localStorage.setItem('z',e.key);
      }
    /**
     * 获得菜单子节点
     * @memberof SiderMenu
     */
    getNavMenuItems = (menusData) => {

        if (!menusData) {
            return [];
        }

        return menusData
            .filter(item => item.name && !item.hideInMenu)
            .map((item) => {
                const ItemDom = this.getSubMenuOrItem(item);
                return ItemDom;
            })
            .filter(item => !!item);
    }
    /**
     * get SubMenu or Item
     */
    getSubMenuOrItem = (item) => {
        if (item.children && item.children.some(child => child.name)) {
            return (
                <SubMenu
                    title={
                        item.icon ? (
                            <span>
                                {getIcon(item.icon)}
                                <span>{item.name}</span>
                             </span>
                        ) : item.name
                    }
                    key={item.path}
                >
                    {this.getNavMenuItems(item.children)}
                </SubMenu>
            );
        } else {
            return (
                <Menu.Item key={item.path}>
                    {this.getMenuItemPath(item)}
                </Menu.Item>
            );
        }
    }
    /**
     * 判断是否是http链接.返回 Link 或 a
     * Judge whether it is http link.return a or Link
     * @memberof SiderMenu
     */
    getMenuItemPath = (item) => {
        const itemPath = this.conversionPath(item.path);
        const icon = getIcon(item.icon);
        const {target, name} = item;
        // Is it a http link
        if (/^https?:\/\//.test(itemPath)) {
            return (
                <a href={itemPath} target={target}>
                    {icon}<span>{name}</span>
                </a>
            );
        }
        return (
            <Link
                to={itemPath}
                target={target}
                // replace={itemPath === this.props.location.pathname}
            >
                {icon}<span>{name}</span>
            </Link>
        );
    };
    // conversion Path
    // 转化路径
    conversionPath = (path) => {
        if (path && path.indexOf('http') === 0) {
            return path;
        } else {
            return `/${path || ''}`.replace(/\/+/g, '/');
        }
    };

    /**
     * Convert pathname to openKeys
     * /list/search/articles = > ['list','/list/search']
     * @param  props
     */
    getDefaultCollapsedSubMenus(props) {
        const { location: { pathname } } = props || this.props;
        console.log(pathname)
        // eg. /list/search/articles = > ['','list','search','articles']
        let snippets = pathname.split('/');
        // Delete the end
        // eg.  delete 'articles'
        snippets.pop();
        // Delete the head
        // eg. delete ''
        snippets.shift();
        // eg. After the operation is completed, the array should be ['list','search']
        // eg. Forward the array as ['list','list/search']
        snippets = snippets.map((item, index) => {
            // If the array length > 1
            if (index > 0) {
                // eg. search => ['list','search'].join('/')
                return snippets.slice(0, index + 1).join('/');
            }
            // index 0 to not do anything
            return item;
        });
        snippets = snippets.map((item) => {
            return this.getSelectedMenuKeys(`/${item}`)[0];
        });
        // eg. ['list','list/search']
        return snippets;
    }
    /**
     * Get selected child nodes
     * /user/chen => /user/:id
     */
    getSelectedMenuKeys = (path) => {
        console.log(path)
        const flatMenuKeys = this.getFlatMenuKeys(this.menus);
        return flatMenuKeys.filter((item) => {
            return pathToRegexp(`/${item}`).test(path);
        });
    }
    handleOpenChange = (openKeys) => {

        const lastOpenKey = openKeys[openKeys.length - 1];
        const isMainMenu = this.menus.some(
            item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
        );
        this.setState({
            openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
        });
    }
    render() {
        const { openKeys } = this.state;
        // // Don't show popup menu when it is been collapsed
        // const menuProps = {
        //     openKeys,
        // };
        // // if pathname can't match, use the nearest parent's key
        // let selectedKeys = this.getSelectedMenuKeys(pathname);
        // if (!selectedKeys.length) {
        //     selectedKeys = [openKeys[openKeys.length - 1]];
        // }
        const routerObj = getFlatMenuData(getMenuData());
        console.log([this.state.defaultOpenKeys]);
        console.log([this.state.current]);
        console.log([openKeys[openKeys.length - 1]]);
        
        return (
            <Router>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider>
                        <Menu
                            key="Menu"
                            theme="dark"
                            mode="inline"
                            style={{padding: '16px 0', width: '100%'}}
                            defaultOpenKeys={[this.state.defaultOpenKeys]}
                            openKeys={[openKeys[openKeys.length - 1]]}
                            selectedKeys={[this.state.current]}
                            //onSelect={this.handleStoreKey}
                            onClick={this.handleClick}
                            onOpenChange={this.handleOpenChange}
                        >
                            {this.getNavMenuItems(getMenuData())}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}/>
                        <Content style={{margin: '0 16px'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                                <Switch>
                                    {
                                        redirectDom
                                    }
                                    {
                                        Object.keys(routerObj).map(key =>
                                            (
                                                <Route key={key} exact path={`/${key}`}
                                                       component={routerObj[key].component}
                                                />
                                            )
                                        )
                                    }
                                    <Route component={NoMatch}/>
                                </Switch>
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            Ant Design ©2016 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}
export default SiderDemo;
