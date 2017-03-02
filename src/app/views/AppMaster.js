import React,{Component} from 'react';

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