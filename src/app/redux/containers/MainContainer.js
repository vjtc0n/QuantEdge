/**
 * Created by vjtc0n on 2/2/17.
 */
import React,{Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import faker from 'faker'
import _ from 'underscore'

import ItemRow from '../components/ItemRow'

import * as InsideAppActions from '../actions/insideAppActions';

const data = [];
for (let i=0; i< 30; i++) {
    data.push({
        id: i + 1,
        code: faker.random.word() + '.AX',
        company: faker.company.companyName(),
        price: (Math.random() * (99.99 - 0.01) + 0.01).toFixed(2),
        value: (Math.random() * (1000000 - 1000) + 1000).toFixed(0),
        change: 0.00,
        percentChange: 0.00
    })
}


class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: []
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.insideApp.allData)
        if (this.props.insideApp.allData != nextProps.insideApp.allData) {
            console.log('Changed')
            return true
        } else {
            console.log('LMAO')
            return false
        }
    }

    updateRowData = (index, price, value) => {
        this.props.actions.updateRowData(index, price, value)
    }

    render() {
        return (
            <div>
                <div>Quant Edge</div>
                {
                    this.props.insideApp.allData.map((item, index)=> {
                        return (
                            <main
                                key={`Item_${item.id}_${index}`}>
                                <ItemRow
                                    updateRowData={this.updateRowData}
                                    data={item}/>
                            </main>

                        )
                    })
                }
            </div>
        )
    }

    componentDidMount() {
        this.props.actions.initData(data)
    }
}

function mapStateToProps(state) {
    return {
        insideApp: state.insideApp,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...InsideAppActions}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
