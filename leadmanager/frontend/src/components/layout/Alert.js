import React, { Component, Fragment } from 'react'
import { withAlert } from 'react-alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


class Alert extends Component {

    static proptypes = {
        erros: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired

    }
    componentDidUpdate(prevState) {
        const error = this.props.errors;
        const alert = this.props.alert;
        const message = this.props.message
        if (prevState.errors !== error) {
            if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
            if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
            if (error.msg.message) alert.error(`Message: ${error.msg.message.join()}`);
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
            if (error.msg.username) alert.error(error.msg.username.join());
        }
        if (prevState.message !== message) {
            const key = Object.keys(message)
            alert.success(message[key])
        }

    }
    render() {
        return (
            <Fragment />
        )
    }
}
const mapStateToProps = state => ({
    errors: state.errors,
    message: state.message
})

export default connect(mapStateToProps)(withAlert()(Alert))
