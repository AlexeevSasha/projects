import { DocumentContext } from "next/document";
import React, { Component } from "react";

interface IProps {
  statusCode: number;
}

export default class Error extends Component<IProps> {
  public static async getInitialProps({ res, err }: DocumentContext) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  public render() {
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
    );
  }
}
