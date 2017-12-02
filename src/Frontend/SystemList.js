const SystemList = function(props) {
	const entries = props.list.map((info) => <SystemEntry info={info} />);
	return (
		<div>
			<h3>Systems</h3>
			{entries}
		</div>
	);
};