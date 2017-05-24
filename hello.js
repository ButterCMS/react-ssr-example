import React from 'react';
import Butter from 'buttercms'

const butter = Butter('b60a008584313ed21803780bc9208557b3b49fbb');

var Hello = React.createClass({
  getInitialState: function() {
    return {loaded: false};
  },
  componentWillMount: function() {
    butter.post.list().then((resp) => {
      this.setState({
        loaded: true,
        resp: resp.data
      })
    });
  },
  render: function() {
    if (this.state.loaded) {
      return (
        <div>
          {this.state.resp.data.map((post) => {
            return (
              <div key={post.slug}>{post.title}</div>
            )
          })}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
});

export default Hello;