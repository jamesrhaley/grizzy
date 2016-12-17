import React from 'react';
import Rx from 'rx';
import {getSuggestions} from './autoTagModel';
import {currentSetStream} from '../../mainStream';
import {inArray} from '../../helpers/sharedResource';

const ReactTags = require('react-tag-input').WithContext;

const minQueryLength = 1

const placeholder = "Search Disease or Mapped Trait"

const AutoTag = React.createClass({
  getInitialState: function() {
    return {
      tags: [],
      suggestions: []
    }
  },

  getSuggestions: getSuggestions,

  getSuggestionValue: function(suggestions) {
    let results = [];
    suggestions.forEach(suggest => {
      results.push(suggest.name)
    })
    return results;
  },

  handleDelete: function(i) {
    let tags = this.state.tags;

    tags.splice(i, 1);
    this.setState({tags: tags});

    currentSetStream.onNext(tags);
  },

  handleAddition: function(tag) {
    let tags = this.state.tags;
    let suggestions = this.state.suggestions;
    function tagList(tags){
      let list = [];
      tags.forEach(tagObject => {
        list.push(tagObject.text);
      });
      return list;
    }

    if (inArray(tag, suggestions) && !inArray(tag, tagList(tags))) {
      tags.push({
        id: tags.length + 1,
        text: tag
      });
      this.setState({tags: tags});
      
      currentSetStream.onNext(tags);
      }
  },

  handleDrag: function(tag, currPos, newPos) {
    let tags = this.state.tags;

    // mutate array 
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render 
    this.setState({ tags: tags });
    
    currentSetStream.onNext(tags)
  },

  handleInputChange: function(obj) {
    let values = this.getSuggestions(obj);

    this.setState({
      suggestions: this.getSuggestionValue(values)
    });
  },

  render: function() {
    let tags = this.state.tags;
    let suggestions = this.state.suggestions;
    return (
      <div>
        <ReactTags tags={tags}
          minQueryLength={minQueryLength}
          suggestions={suggestions}
          placeholder={placeholder}
          handleInputChange={this.handleInputChange}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag} />
      </div>
    )
  }
});

export default AutoTag;