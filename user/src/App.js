import React, { Component } from 'react';
import './App.css';

var Comment = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
    getInitialState: function() {
        return {author: '', text: ''};
    },
    handleAuthorChange: function(e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },
    render: function() {
        return (
          <form className="commentForm">
            <input type="text" placeholder="Your name" />
            <input type="text" placeholder="Say something..." />
            <input type="submit" value="Post" />
          </form>
    );
  }
});

var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
      },
    getInitialState: function() {
        return {data: []};
      },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
      },
    render: function() {
    return (
      <div className="App">
           <div className="App-header">
               <h1>Comments</h1>
           </div>
          <div class="App-intro">
              <CommentList data={ this.state.data }/>
              <CommentForm />
          </div>
      </div>
    );
  }
});

// var App = React.createClass({
//     render: function() {
//         return (
//             <div className="App">
//                 <div className="App-header">
//                     <img src={logo} className="App-logo" alt="logo"/>
//                     <h2>Welcome to React</h2>
//                 </div>
//                 <p className="App-intro">
//                     To get started, edit <code>src/App.js</code> and save to reload.
//                 </p>
//                 <CommentBox />
//             </div>
//         );
//     }
// });


export default CommentBox;
