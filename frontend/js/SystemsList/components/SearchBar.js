import React from 'react'
import { Icon, Input, Button } from 'semantic-ui-react'
import {search} from '../actions/SystemsActions';
import { connect } from 'react-redux';

class SearchBar extends React.Component {
  onUserInput(e) {
    this.props.search(e.target.value);
  }

  render() {
    return (
      <div>
        <Input icon='search' onChange={this.onUserInput.bind(this)}
          placeholder={'Search for a tag...'}
          />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    data: state.systemsList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    search: (term, offset) => {
      dispatch(search(term, offset));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
