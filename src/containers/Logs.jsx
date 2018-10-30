import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class Logs extends Component {
    render() {
        let logs = '';
        _.each(this.props.logs, (log) => logs = logs +  log + '\n' )
        return (
            <>
                <h3>Pelin logi</h3>
                <textarea style={{ width: '100%', height: '300px', fontSize: '1.5em', }} readOnly value={logs} />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    logs: state.logReducer.logs,
});

export default connect(mapStateToProps)(Logs);
