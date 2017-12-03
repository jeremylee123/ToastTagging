const SystemEntry = function(props) {
	return (
			<div className="SystemEntry">{props.info.companyName} | {props.info.systemName}</div>
	);
};