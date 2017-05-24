import React from 'react';
import Butter from 'buttercms'
import Transmit from 'react-transmit';

const butter = Butter('b60a008584313ed21803780bc9208557b3b49fbb');

var Hello = React.createClass({
  render: function() {
    if (this.props.posts) {
      return (
        <div>
          {this.props.posts.data.map((post) => {
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

export default Transmit.createContainer(Hello, {
  // These must be set or else it would fail to render
  initialVariables: {},
  // Each fragment will be resolved into a prop
  fragments: {
    posts() {
      return butter.post.list().then((resp) => resp.data);
    }
  }
});