const SystemList = function(props) {
	const entries = props.list.map((info) => <SystemEntry key={info.id} info={info} />);
	return (
		<div>
			<h3>Systems</h3>
			<div className="SystemList">
				{entries}
			</div>
		</div>
	);
};