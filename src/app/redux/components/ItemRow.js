/**
 * Created by vjtc0n on 3/2/17.
 */
import React,{Component, PropTypes} from 'react';

export default class ItemRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    render() {
        return (
            <div>
                <div className="mdl-cell mdl-cell--6-col center_row">
                    <div>{this.props.data.code}</div>
                    <div>{this.props.data.company}</div>
                    <div>{this.props.data.price}</div>
                    <div>{this.props.data.value}</div>
                    <div>{this.props.data.change}</div>
                    <div>{this.props.data.percentChange}</div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            total: this.props.data.price * this.props.data.value
        })
        setInterval(() => {
            this.props.updateRowData(this.props.data.id, 10, 20)
        }, 5000);
    }
}