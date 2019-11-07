import TextField, { FilledTextFieldProps } from '@material-ui/core/TextField';
import React from 'react';

type useFormProperties = ReturnType<
	typeof import('react-hook-form')['default']
>;

interface Props {
	register?: useFormProperties['register'];
	name: string;
	label: string;
	error?: string;

	// Validation properties
	required?: boolean;
}

const Input: React.FC<Props & Omit<FilledTextFieldProps, 'variant'>> = ({
	register,
	name,
	label,
	error,

	// Validation properties
	required,
	...rest
}) => {
	return (
		<TextField
			name={name}
			inputRef={register({
				required,
			})}
			error={error !== undefined}
			helperText={error}
			label={label}
			margin="normal"
			variant="filled"
			required={required}
			{...rest}
		/>
	);
};

export default Input;
