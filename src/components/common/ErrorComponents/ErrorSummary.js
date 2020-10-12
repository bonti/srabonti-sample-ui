import React, { Component } from 'react';
import { Alert } from 'antd';  

class ErrorSummary extends Component {
    renderErrorMessages = (errorMessages) => {
        errorMessages = errorMessages.sort((a, b) => a.key.localeCompare(b.key));
        let e = errorMessages.map(
            (error, index) =>
                <p key={error.key + index} style={{ marginBottom: 2 }}>
                    {index + 1 + ") " + (error.key.split(".").length > 1 ? error.key.split(".")[1] : "") + " " + (error.key !== "error" ? error.key.split('/(?=[A-Z])/').join(" ") + " :- " : "") + error.message}
                </p>);
        return e;
    }

    render() {
        const { error } = this.props;
        return (
            <Alert showIcon
                style={{ marginBottom: 10 }}
                message={"An error occurred"}
                type="error"
                description={this.renderErrorMessages(error.errorMessage)}
            />
        );
    }
}

export default ErrorSummary;