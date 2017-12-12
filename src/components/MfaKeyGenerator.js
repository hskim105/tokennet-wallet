import React, { Component } from 'react';
import Speakeasy from "speakeasy";

class MfaKeyGenerator extends Component {
    render() {
        let secret = Speakeasy.generateSecret({
            length: 56
        });

        let seconds = 10;

        let token = Speakeasy.totp({
            secret: secret.base32
            
        })

        return (secret)
    }
};

export default MfaKeyGenerator;