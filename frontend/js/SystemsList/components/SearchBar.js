import React from 'react'
import { Icon, Input, Button } from 'semantic-ui-react'
import {search} from '../actions/SystemsActions';
import { connect } from 'react-redux';

class SearchBar extends React.Component {
  onSearch() {
    console.log(this.state.userInput);
    this.props.search(this.state.userInput, 0);

  }
  onUserInput(e) {
    this.setState({userInput: e.target.value});
  }

  render() {
    return (
      <div>
        <Input onChange={this.onUserInput.bind(this)}
          placeholder={'Search for a tag...'}
          />
        <Button icon onClick={this.onSearch.bind(this)}>
          {<Icon name='search' inverted circular link />}
          </Button>
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
