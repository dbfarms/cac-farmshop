import React, { Component } from 'react';

export default class Footer extends Component {

    render(){
        return(
            <div className="footer">
                <ul>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>

            </div>
        )
    }

}