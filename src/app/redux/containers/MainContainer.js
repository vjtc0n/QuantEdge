/**
 * Created by vjtc0n on 2/2/17.
 */
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import faker from 'faker'

import ItemRow from '../components/ItemRow'

import * as InsideAppActions from '../actions/insideAppActions';

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

    onMainClick() {
        this.setState({
            tab: 'main'
        })
    }


    render() {
        let tab = null
        if (this.state.tab === 'main') {
            tab = this.props.insideApp.allData.map((item, index)=> {
                    return (
                        <main
                            key={`Item_${item.id}_${index}`}>
                            <ItemRow data={item}/>
                        </main>

                    )
                })
        } else if (this.state.tab === 'gainer') {
            tab = this.props.insideApp.topGainersData.slice(0, 20).map((item, index)=> {
                return (
                    <main
                        key={`Item_${item.id}_${index}`}>
                        <ItemRow data={item}/>
                    </main>

                )
            })
        } else {
            tab = this.props.insideApp.topLosersData.slice(0, 20).map((item, index)=> {
                return (
                    <main
                        key={`Item_${item.id}_${index}`}>
                        <ItemRow data={item}/>
                    </main>

                )
            })
        }

        return (
            <div>
                <div onClick={() => this.onMainClick()}>Quant Edge</div>
                <br/>
                <br/>
                <div onClick={() => this.onTopGainersClick()}>Top Gainers</div>
                <div onClick={() => this.onTopLosersClick()}>Top Losers</div>
                {tab}
            </div>
        )
    }

    componentDidMount() {
        setInterval(() => {
            let self = this;
            let tempOldData = this.props.insideApp.allData
            this.props.insideApp.allData.forEach(function (data) {
                let updatedPrice = (Math.random() * ((data.price*( 1 + 0.05) - data.price*( 1 - 0.05)) + data.price*( 1 - 0.05)));
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
