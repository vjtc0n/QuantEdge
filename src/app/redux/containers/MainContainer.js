/**
 * Created by vjtc0n on 2/2/17.
 */
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import faker from 'faker'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {AppBar, Tabs, Tab} from 'material-ui'

import * as InsideAppActions from '../actions/insideAppActions';

/*
* Fake data
* */

const data = [];
for (let i=0; i< 30; i++) {
    let price = (Math.random() * (99.99 - 0.01) + 0.01)
    let value = (Math.random() * (1000000 - 1000) + 1000).toFixed(0)
    data.push({
        id: i + 1,
        code: faker.random.word() + '.AX',
        company: faker.company.companyName(),
        price: price,
        value: value,
        change: 0.00,
        percentChange: 0.00,
        total: price*value
    })
}


class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state= {
            allData: [],
            tab: 'main'
        }
    }

    componentWillMount() {
        this.props.actions.initData(data)
    }

    onTopGainersClick() {
        this.setState({
            tab: 'gainer'
        })
    }

    onTopLosersClick() {
        this.setState({
            tab: 'loser'
        })
    }


    render() {
        let datasource = null
        if (this.state.tab === 'main') {
            datasource = this.props.insideApp.allData
        } else if (this.state.tab === 'gainer') {
            datasource = this.props.insideApp.topGainersData.slice(0, 20)
        } else {
            datasource = this.props.insideApp.topLosersData.slice(0, 20)
        }

        return (
            <div style={{backgroundColor: '#d9d9d9'}}>
                <div style={{margin: 20}}>
                    <AppBar
                        showMenuIconButton={false}
                        title="S&P/ASX">
                        <Tabs style={{width: 400, marginRight: 150}}>
                            <Tab
                                onActive={() => this.onTopGainersClick()}
                                label="TOP GAINERS" />
                            <Tab
                                onActive={() => this.onTopLosersClick()}
                                label="TOP LOSERS" />
                        </Tabs>
                    </AppBar>
                    <Table
                        style={{marginBottom: 2}}
                        fixedHeader={true}
                        fixedFooter={true}
                        selectable={false}
                        multiSelectable={false}>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                            enableSelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn tooltip="The Code">Code</TableHeaderColumn>
                                <TableHeaderColumn tooltip="The Company">Company</TableHeaderColumn>
                                <TableHeaderColumn tooltip="The Price">Price</TableHeaderColumn>
                                <TableHeaderColumn tooltip="The Value">Value</TableHeaderColumn>
                                <TableHeaderColumn tooltip="The Change">Change</TableHeaderColumn>
                                <TableHeaderColumn tooltip="The Percentage of Change">%Change</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            deselectOnClickaway={false}
                            showRowHover={false}
                            stripedRows={false}>
                            {
                                datasource.map( (row, index) => (
                                    <TableRow key={index} selected={row.selected}>
                                        <TableRowColumn style={{color: 'blue'}}>{row.code}</TableRowColumn>
                                        <TableRowColumn style={{color: 'gray', fontWeight: 1}}>{row.company}</TableRowColumn>
                                        <TableRowColumn>{row.price.toFixed(2)}</TableRowColumn>
                                        <TableRowColumn>{row.value}</TableRowColumn>
                                        <TableRowColumn style={{color: (row.change >= 0) ? '#33ff77' : 'red'}}>{row.change.toFixed(2)}</TableRowColumn>
                                        <TableRowColumn style={{color: (row.percentChange >= 0) ? '#33ff77' : 'red'}}>{row.percentChange.toFixed(2)}</TableRowColumn>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }

    componentDidMount() {

        /*
        * Reloading over 5 seconds
        * */
        setInterval(() => {
            let self = this;
            let tempOldData = this.props.insideApp.allData

            /*
            * Update data for each Row
            * */
            this.props.insideApp.allData.forEach(function (data) {
                let smallerPrice = data.price*( 1 - 0.05)
                let biggerPrice = data.price*( 1 + 0.05)
                let updatedPrice = (Math.random() * (biggerPrice - smallerPrice) + smallerPrice);
                let updatedValue = Number(data.value) + Number((Math.random() * (30 - 10) + 10).toFixed(0));
                let updatedTotal = (updatedPrice*updatedValue);
                self.props.actions.updateRowData(
                    data.id,
                    updatedPrice,
                    updatedValue,
                    updatedTotal,
                    (updatedTotal - data.total),
                    (updatedTotal - data.total)/data.total*100)
            });
            this.setState({
                allData: this.props.insideApp.allData
            }, () => {
                this.props.actions.savePrevioudData(tempOldData);
            })
        }, 5000)
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
