/*
  底部导航栏
*/
import React from "react";
import {NavLink} from 'react-router-dom';
import { withRouter } from 'react-router';
import '../assets/css/components/navigation.scss';

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.aNavs = [
      {
        path:"/",
        text:"首页",
        icon:"iconfont-home"
      },
      {
        path:"/old/consultcenter?platform=web&city_no=undefined",
        text:"问诊",
        icon:"iconfont-stethoscope",
        redirect:true//是否调整到其他项目
      },
      {
        path:"/myguestbook/0",
        text:"消息",
        icon:"iconfont-news"
      },
      {
        path:"/personalcenter",
        text:"个人中心",
        icon:"iconfont-personalcenter"
      }
    ]
  }
  isSelect( path ){
    let {pathname} = this.props.location;
    return path == pathname;
  }
  showNavItems(){
    return this.aNavs.map(( item , index )=>{
      if(item.redirect){
        return (
          <a key={item.path} className={`flex-1`} href={item.path}>
            <i className={`iconfont ${item.icon}${ this.isSelect( item.path ) ? "-active" : ''}`}></i>
            {item.text}
          </a>
        )
      }else{
        return (
          <NavLink exact key={item.path} className={`flex-1`} to={item.path}>
            <i className={`iconfont ${item.icon}${ this.isSelect( item.path ) ? "-active" : ''}`}></i>
            {item.text}
          </NavLink>
        )
      }
    });
  }
  render() {
    return (
      <div className="dis-flex navigation text-center">
        {this.showNavItems()}
      </div>
    )
  }
}

export default withRouter( Navigation )
