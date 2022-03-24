import styles from './Form.module.css';

const Form = ({ children, error, submitHandler, setError }) => {
	return (
		<form
			className={styles.form}
			onSubmit={(e) => {
				submitHandler(e);
			}}
		>
			{children}
			{error.length > 0 && (
				<div className={styles.errorContainer}>
					{error.map((err, index) => (
						<span key={index}>{err}</span>
					))}
				</div>
			)}
			<div className={styles.buttonContainer}>
				<button type='reset' onClick={() => setError([])}>
					Reset
				</button>
				<button type='submit'>Daftar</button>
			</div>
		</form>
	);
};

export default Form;
