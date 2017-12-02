const SystemEntry = function(props) {
	return (
		<div>
			<span>{props.info.companyName} | {props.info.systemName}</span>
		</div>
	);
};