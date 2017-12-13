import React from 'react';
import { Button,Table,Input } from 'semantic-ui-react'

class SystemTagCreate extends React.Component {
	tagSystem() {
	  console.log("Adding tag");
	  this.setState({isAdding: true});
	  const serialNumber = this.props.serialNumber;
	  const tagName = this.state.userInput;
	  console.log(tagName, serialNumber)
	  fetch('http://127.0.0.1:3000/api/tags?serial_id='+ serialNumber +'&name='+ tagName +'&visibility=0', {
      method: "POST",
      headers: {
        "token": localStorage.token
      }
    })
    .then((resp) => resp.json())
    .then((data) => {
    	console.log(data)
    	// window.location.reload();
    })
    .catch((error) => {
      console.log("There was an internal error fetching info for system "+ serialNumber);
      console.log(error);
      console.log("done printing error")
    });
	}
	onUserInput(e) {
    this.setState({userInput: e.target.value});
  }
  componentWillMount() {
	  this.setState({isAdding: false});
	}
	render() {
		const isAdding = this.state.isAdding;
		const addTag = this.props.addTag;
		return (
			<Table.Row>
				<Table.Cell collapsing>
					<Button onClick={this.tagSystem.bind(this)}>{"Add Tag"}</Button>
				</Table.Cell>
				<Table.Cell>
					<Input onChange={this.onUserInput.bind(this)} loading={isAdding} placeholder='New Tag Name' />
				</Table.Cell>
			</Table.Row>
		)
	}
}

export default SystemTagCreate
