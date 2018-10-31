import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class Logs extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.logs.length > this.props.logs.length) {
            console.log('uusia logeja!')
            if (this.textLog) {
                this.textLog.scrollTop = this.textLog.scrollHeight;
            }
        }
    }

    render() {
        let logs = '';
        _.each(this.props.logs, (log) => logs = logs +  log + '\n' )
        return (
            <>
                <h3>Pelin logi</h3>
                <textarea ref={textLog => this.textLog = textLog} style={{ width: '100%', height: '300px', fontSize: '1.6em', }} readOnly value={logs} />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    logs: state.logReducer.logs,
});

export default connect(mapStateToProps)(Logs);
