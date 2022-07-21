import React, { createRef } from "react";

export default class SlipAwayListener extends React.Component {
    wrapperRef = createRef();

    componentDidMount() {
        this.props.onClickAway && document.addEventListener("mousedown", this.handleClickOutside);
        this.props.onScrollAway && document.addEventListener("scroll", this.handleScrollOutside);
    }

    // handle didUpdate part when requirement demands

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
        document.removeEventListener("scroll", this.handleScrollOutside);
    }

    handleClickOutside = event => {
        if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
            this.props.onClickAway && this.props.onClickAway();
        }
    };

    handleScrollOutside = event => {
        if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
            this.props.onScrollAway && this.props.onScrollAway();
        }
    };

    render() {
        return this.props.renderOwnChildren ? (
            this.props.renderOwnChildren(this.wrapperRef)
        ) : (
            <div ref={this.wrapperRef}>{this.props.children}</div>
        );
    }
}
