import { useState } from 'react';
import Form from './components/Form';
import styles from './App.module.css';

function App() {
	const [errorList, setErrorList] = useState([]);
	const [formData, setFormData] = useState({
		namaLengkap: '',
		email: '',
		telepon: '',
		pendidikan: '',
		kelas: '',
		fotoSurat: '',
	});

	const submitHandler = (e) => {
		e.preventDefault();
		const error = [];
		const { namaLengkap, email, telepon, pendidikan, kelas, fotoSurat } = formData;

		!/[a-zA-Z]$/.test(namaLengkap) && error.push('Nama lengkap tidak boleh mengandung angka!');
		namaLengkap.length === 0 && error.push('Nama lengkap tidak boleh kosong!');

		email.length === 0 && error.push('Email tidak boleh kosong!');

		!/[0-9]$/.test(telepon) && error.push('Nomor telepon tidak boleh mengandung huruf!');
		telepon.length === 0 && error.push('Nomor telepon tidak boleh kosong!');

		pendidikan === '' && error.push('Mohon pilih latar belakang pendidikan!');

		kelas === '' && error.push('Mohon pilih kelas!');

		fotoSurat.length === 0 && error.push('Mohon upload foto surat!');

		if (error.length) {
			setErrorList(error);
			return alert('Mohon periksa kembali form anda!');
		}

		setErrorList(error);
		alert(`${namaLengkap} berhasil didaftarkan!`);
		console.log(formData);
		e.target.reset();
		setFormData({
			namaLengkap: '',
			email: '',
			telepon: '',
			pendidikan: '',
			kelas: '',
			fotoSurat: '',
		});
	};

	const inputHandler = (e, name) => {
		if (e.target.type === 'file') {
			return setFormData({ ...formData, [name]: e.target.files[0].name });
		}
		setFormData({ ...formData, [name]: e.target.value });
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Pendaftaran Peserta Coding Bootcamp</h1>
				<p>Silahkan isi form di bawah ini untuk mendaftar</p>
			</div>

			<Form error={errorList} submitHandler={submitHandler} setError={setErrorList}>
				<label htmlFor='nama'>Nama lengkap*</label>
				<input
					type='text'
					name='namaLengkap'
					id='nama'
					placeholder='Masukkan nama lengkap disini'
					onChange={(e) => inputHandler(e, e.target.name)}
				/>

				<label htmlFor='email'>Email*</label>
				<input type='email' name='email' id='email' placeholder='Masukkan email disini' onChange={(e) => inputHandler(e, e.target.name)} />

				<label htmlFor='telp'>No. Telp*</label>
				<input
					type='text'
					name='telepon'
					id='telp'
					minLength={9}
					maxLength={14}
					placeholder='Masukkan nomor telepon disini'
					onChange={(e) => inputHandler(e, e.target.name)}
				/>

				<span>Latar belakang pendidikan*</span>
				<div className={styles.formRadioContainer}>
					<input type='radio' name='pendidikan' id='IT' value='IT' onChange={(e) => inputHandler(e, e.target.name)} />
					<label htmlFor='IT'>IT</label>
					<input type='radio' name='pendidikan' id='nonIT' value='nonIT' onChange={(e) => inputHandler(e, e.target.name)} />
					<label htmlFor='nonIT'>Non IT</label>
				</div>

				<label htmlFor='kelas'>Kelas coding yang dipilih*</label>
				<select name='kelas' id='kelas' onChange={(e) => inputHandler(e, e.target.name)}>
					<option value='' hidden selected>
						Pilih kelas
					</option>
					<option value='backend'>Coding Backend with Golang</option>
					<option value='frontend'>Coding Frontend with React</option>
					<option value='fullstack'>Fullstack Developer</option>
				</select>

				<label htmlFor='surat'>Foto surat kesungguhan*</label>
				<input type='file' name='fotoSurat' id='surat' onChange={(e) => inputHandler(e, e.target.name)} />

				<label htmlFor='harapan'>Harapan untuk coding bootcamp ini</label>
				<textarea name='harapan' id='harapan' cols='30' rows='5' onChange={(e) => inputHandler(e, e.target.name)} />
			</Form>
		</div>
	);
}

export default App;
