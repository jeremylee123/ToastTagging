import React from 'react'
import { Icon, Input, Button } from 'semantic-ui-react'
import {getSystemsList} from '../actions/SystemsActions';
import { connect } from 'react-redux';

class Pagination extends React.Component {
  onRight() {
    this.props.onClick(this.props.data.page + 1 );
  }
  onLeft() {
    this.props.onClick(this.props.data.page - 1 );
  }
  render() {
    return(
      <div>
        <Button icon onClick={this.onLeft.bind(this)}>
          <Icon name='chevron left' />
        </Button>
        <Button icon onClick={this.onRight.bind(this)}>
          <Icon name='chevron right' />
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
    onClick: (newPage) => {
      dispatch(getSystemsList(newPage));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
