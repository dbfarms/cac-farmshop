import React, { Component } from 'react';

export default class SideBarCategory extends Component {
    constructor(props){
        super(props)

        this.state = {
            highlight: ''
        }
        
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        //debugger
        var winHeight = window.innerHeight;
     
        var body = document.body;
        var html = document.documentElement;
        var docHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                        html.clientHeight, html.scrollHeight, html.offsetHeight );
     
        var value = document.body.scrollTop;
        var el = document.getElementById('story_body');
        var minPixel = el.offsetTop;
        var maxPixel = minPixel + el.scrollHeight;
        var value = document.body.scrollTop;

        // respect bounds of element
        var percent = (value - minPixel)/(maxPixel - minPixel);
        percent = Math.min(1,Math.max(percent, 0))*100;

        /*
        console.log("minxpixel")
        console.log(minPixel)
        console.log("maxxpixel")
        console.log(maxPixel)
        console.log("value")
        console.log(value)
        console.log("percent")
        console.log(percent)
        */

     }


    render(){

        return (
            <div id="story_body">
                
            </div>
        )
    }
}