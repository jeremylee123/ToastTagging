import React from 'react';
import { Button,Table,Input,Dropdown } from 'semantic-ui-react'

class SystemTagCreate extends React.Component {
	tagSystem() {
	  console.log("Adding tag");
	  const serialNumber = this.props.serialNumber;
	  const tagName = this.state.userInput;
	  const visibility = this.state.privacy;
	  const groupID = this.state.groupID;
	  if(groupID == undefined && visibility == 1) {
	  	alert("Please enter a group ID");
	  	return;
	  }
	  if(tagName == undefined || tagName == "") {
	  	alert("Please enter a tag name");
	  	return;
	  }
	  else {
	  	console.log(serialNumber, tagName, visibility)
	  	this.setState({isAdding: true});
	  	fetch('http://13.59.204.24:3000/api/tags?serial_id='+ serialNumber +'&name='+ tagName +'&visibility='+ visibility, {
	      method: "POST",
	      headers: {
	        "token": localStorage.token
	      }
	    })
	    .then((resp) => resp.json())
	    .then((data) => {
	    	window.location.reload();
	    })
	    .catch((error) => {
	      console.log("There was an internal error fetching info for system "+ serialNumber);
	      console.log(error);
	      console.log("done printing error")
	    });
	  }
	}
	onUserInput(e) {
    this.setState({userInput: e.target.value});
  }
  onChangePrivacy(e, { searchQuery, value }) {
    this.setState({privacy: value});
  }
  onChangeGroup(e, { searchQuery, value }) {
    this.setState({groupID: value});
  }
  componentWillMount() {
	  this.setState({isAdding: false,privacy: 0});
	}
	render() {
		const isAdding = this.state.isAdding;
		const addTag = this.props.addTag;
		const privacyOptions = [
			{key: 0, value: 0, text: "Public"},
			{key: 1, value: 1, text: "Group"},
			{key: 2, value: 2, text: "Private"}
		];
		return (
			<Table.Row>
				<Table.Cell collapsing>
					<Button onClick={this.tagSystem.bind(this)}>{"Add Tag"}</Button>
				</Table.Cell>
				<Table.Cell>
					<Input onChange={this.onUserInput.bind(this)} loading={isAdding} placeholder='New Tag Name' />
					<Dropdown placeholder='State' defaultValue={0} onChange={this.onChangePrivacy.bind(this)} selection options={privacyOptions} />
					<Input onChange={this.onChangeGroup.bind(this)} placeholder='Group ID' disabled={this.state.privacy!=1} />
				</Table.Cell>
			</Table.Row>
		)
	}
}

export default SystemTagCreate
