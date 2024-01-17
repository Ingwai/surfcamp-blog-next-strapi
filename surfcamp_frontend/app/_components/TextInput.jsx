const TextInput = ({ inputName, value, onChange, label }) => {
	return (
		<div className='input__container'>
			<label htmlFor={inputName} className='copy'>
				{label}
			</label>
			<input
				className='input input__text input__beige'
				type='text'
				id={inputName}
				value={value}
				name={inputName}
				onChange={onChange}
			/>
		</div>
	);
};

export default TextInput;
