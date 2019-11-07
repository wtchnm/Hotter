import Button from '@material-ui/core/Button';
import MUIDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import useStyles from '../../styles';
import Form from '../Form';
import Input from '../Input';

const Dialog: React.FC = () => {
	const [open, setOpen] = useState(true);

	const handleClose = (): void => {
		setOpen(false);
	};

	const handleSubmit = (
		data: Record<string, string | number | boolean>
	): void => {
		console.log(data);
	};

	const classes = useStyles({});
	return (
		<MUIDialog open={open} onClose={handleClose}>
			<DialogTitle>Pendency</DialogTitle>
			<DialogContent>
				<Form id="PendencyForm" onSubmit={handleSubmit}>
					<Input name="reason" label="Reason" required />
					<Input name="solution" label="Solution" required />
				</Form>
			</DialogContent>
			<DialogActions>
				<Button
					classes={{ root: classes.secondaryButton }}
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button type="submit" form="PendencyForm" color="primary">
					Save
				</Button>
			</DialogActions>
		</MUIDialog>
	);
};

export default Dialog;
