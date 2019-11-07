import React from 'react';
import useForm from 'react-hook-form';

interface Props {
	id: string;
	defaultValues?: Record<string, string | number | boolean>;
	onSubmit: (data: Record<string, string | number | boolean>) => void;
}

const Form: React.FC<Props> = ({ id, defaultValues, children, onSubmit }) => {
	const { register, handleSubmit, errors } = useForm({ defaultValues });

	const handleSubmitProxy = (e: React.FormEvent<HTMLFormElement>): void => {
		if (errors !== undefined) {
			handleSubmit(onSubmit)(e);
		}
	};

	return (
		<form noValidate id={id} onSubmit={handleSubmitProxy}>
			{Array.isArray(children)
				? children.map((child: React.ReactElement) => {
						const errorRef =
							errors[child.props.name] &&
							(errors[child.props.name].ref as HTMLInputElement);

						return child.props.name
							? React.createElement(child.type, {
									...child.props,
									key: child.props.name,
									error:
										errorRef && errorRef.validationMessage,
									register,
							  })
							: child;
				  })
				: ((): JSX.Element => {
						const errorRef =
							errors[(children as JSX.Element).props.name] &&
							(errors[(children as JSX.Element).props.name]
								.ref as HTMLInputElement);

						return React.createElement(
							(children as JSX.Element).type,
							{
								...(children as JSX.Element).props,
								key: (children as JSX.Element).props.name,
								error: errorRef && errorRef.validationMessage,
								register,
							}
						);
				  })()}
		</form>
	);
};

export default Form;
