/* eslint-disable no-control-regex */
import React, { useState, useEffect } from 'react';
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './auth.scss';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function Auth() {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)',
	});
	const is4k = useMediaQuery({ query: '(min-device-width: 2560px)' });

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [token, setToken] = useCookies(['pg-token']);

	const { register, handleSubmit, errors } = useForm();

	useEffect(() => {
		// if (token['pg-token']) window.location.href = '/dashboard';
		if (token['pg-token']?.length > 9) {
			window.location.href = '/dashboard';
		}
	}, [token]);

	const loginClicked = () => {
		API.loginUser({ email, password })
			.then((resp) => setToken('pg-token', resp.access))
			.catch((error) => console.error(error));

		if (!errors && token['pg-token']?.length < 10) {
			toast.error('Invalid Credentials. Please try again!');
		}
	};

	const registerClicked = () => {
		API.registerUser({ email, password })
			.then(() => loginClicked())
			.catch((error) => console.error(error));
	};

	const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

	const isDisabled = email.length === 0 || password.length === 0;

	return (
		<div className='main-container'>
			<span className={`flex-center title ${is4k ? 'mb-320' : null}`}>
				Peer Group Portal
			</span>
			<Container>
				<Row>
					<Col
						xs={12}
						sm={12}
						md={12}
						lg={12}
						xl={8}
						className={`img-col ${
							isTabletOrMobile || isTabletOrMobileDevice
								? 'mb-32 flex-center'
								: null
						}`}
					>
						<Image
							className='auth-img'
							src={
								isTabletOrMobile || isTabletOrMobileDevice
									? '/assets/images/auth-img-mobile.svg'
									: '/assets/images/auth-img.svg'
							}
							fluid
						/>
					</Col>
					<Col xs={12} sm={12} md={12} lg={12} xl={4}>
						<div
							className={`auth-container ${
								isTabletOrMobile || isTabletOrMobileDevice ? 'p-16' : 'p-26-24'
							}`}
						>
							<form onSubmit={handleSubmit()}>
								<input
									id='emailId'
									className={`auth-input ${
										isTabletOrMobile || isTabletOrMobileDevice
											? 'mb-12'
											: 'mb-20'
									}`}
									type='email'
									name='emailID'
									placeholder='EmailID'
									ref={register({ pattern: emailPattern })}
									defaultValue={email}
									onChange={(evt) => setEmail(evt.target.value)}
								/>
								<label className='errorMsg mb-12'>
									{errors.emailID && 'EmailID is invalid'}
								</label>
								<br />
								<input
									id='password'
									className={`auth-input ${
										isTabletOrMobile || isTabletOrMobileDevice
											? 'mb-32'
											: 'mb-20'
									}`}
									type='password'
									name='password'
									placeholder='Password'
									ref={register({ minLength: 6 })}
									defaultValue={password}
									onChange={(evt) => setPassword(evt.target.value)}
								/>
								<label className='errorMsg mb-12'>
									{errors.password && 'Password must be atleast 6 chars. long'}
								</label>
								<br />
								<Button
									type='submit'
									className={`login-btn pointer ${
										isTabletOrMobile || isTabletOrMobileDevice
											? 'mb-16'
											: 'mb-26'
									}`}
									onClick={loginClicked}
									disabled={isDisabled}
								>
									<span className='login-btn-text'>Login</span>
								</Button>
								<br />
								<Button
									type='submit'
									variant='outline-primary'
									className='register-btn pointer'
									onClick={registerClicked}
									disabled={isDisabled}
								>
									<span className='register-btn-text'>Register</span>
								</Button>
							</form>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Auth;
