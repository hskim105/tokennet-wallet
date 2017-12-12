import React, { Component } from 'react';       //Copied since every view had it lol
import QRious from 'qrious';                    //Needed for QR code stuff
import { Redirect } from 'react-router-dom';
import './MfaView.scss';
import T from 'i18n-react';                     //Needed for translating
import { connect } from "react-redux";
import MfaKeyGen from 'components/MfaKeyGenerator'
import IconButton from 'components/IconButton'; //Needed to import the icon
import AccountIcon from 'assets/imgs/account-icon.png';
import pageview from 'utils/pageview';
import Speakeasy from "speakeasy";

class MfaView extends Component {
    componentDidMount() {
		if( this.props.keypair ) {
			new QRious( {
				element: document.getElementById( 'mfa-qrcode' ),
				value: this.props.keypair.publicKey(),
			} );
		}
		pageview();
    }   //IDK
    
    renderRedirect() {
		if ( this.props.keypair === null ) {
			return <Redirect to={'/'}/>;
		}
		else {
			return '';
		}
    }
    
    render() {
        return(
            <div className="mfa-view-container">
                {this.renderRedirect()}

                <div className="content-container">
                    <div className="content-middle-wrapper">
                        <div className="content-wrapper">
                            <div>
                                <p className="mfa-view-container__title" data-lang={this.props.language}>{T.translate( 'common.mfa' )}</p>

                                <hr/>

								<div className="mfa-wrapper">
									<canvas width="90" height="90" id="mfa-qrcode"/>
								</div>

                                <div className="h-group button-wrapper">
									<div className="col">
										<IconButton to="/wallet" label={ T.translate( 'common.account' ) }
													image={ AccountIcon } iconLeft/>
									</div>
								</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => ({
	keypair: state.keypair.keypair,
});

MfaView = connect( mapStateToProps )( MfaView );

export default MfaView;