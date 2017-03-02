import React,{Component} from 'react';
import {Link} from 'react-router';

export default class AppMaster extends Component{
    render(){
        //console.log(this.props.children)
        return (
            <div>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}