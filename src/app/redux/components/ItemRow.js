/**
 * Created by vjtc0n on 3/2/17.
 */
import React,{Component} from 'react';
import '../../stylesheets/styles.css'

export default class ItemRow extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <div className="item">
                    <div>{this.props.data.code}</div>
                    <div>{this.props.data.company}</div>
                    <div>{this.props.data.price.toFixed(2)}</div>
                    <div>{this.props.data.value}</div>
                    <div>{this.props.data.change.toFixed(2)}</div>
                    <div>{this.props.data.percentChange.toFixed(2)}</div>
                    <br/>
                </div>
            </div>
        )
    }

}