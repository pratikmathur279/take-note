import React from 'react';

import { FiUpload } from 'react-icons/fi';

var Upload = (props) => {
	return (
		<div className="upload-container">
			<label htmlFor={props.name} className="file-upload">
				<span>
					<FiUpload svgStyle={{ fill: "#898989", width: "15px", height: "30px", verticalAlign: "middle", marginRight: "10px" }} />
					<span>{props.text}</span>
				</span>
				<input multiple={props.multiple} onChange={props.onChange} id={props.name} type="file" name={props.name} />
			</label>
			{props.errors && <p className="input-error">{props.errors[props.name]}</p>}
		</div>
	);
}

export default Upload;