'use client';

import React, { useState } from 'react';
import TextInput from '../TextInput';
import axios from 'axios';
import { allDataFilledIn } from '@/utils/validation.utils';
import { generateSignupPayload } from '@/utils/strapi.utils';

const SignupForm = ({ headline, infoText, buttonLabel, pricing, eventId = null }) => {
	const [formData, setFormData] = useState({
		firstName: 'Melchior',
		lastName: 'Avogadro',
		email: 'tesla@zlom.us',
		phone: '000111222',
	});

	const [showConfirmation, setShowConfirmation] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const payload = generateSignupPayload(formData, eventId);

		if (allDataFilledIn(formData)) {
			try {
				const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/paticipants`, payload);
				setShowConfirmation(true);
				console.log(response);
			} catch (error) {
				setErrorMessage(error.response?.data?.error?.message || 'Something went wrong');
			}
		} else {
			setErrorMessage('Please fill out all fields!');
		}
	};

	return (
		<section className='signup-form'>
			<div className='signup-form__info'>
				<h3 className='signup-form__headline'>{headline || 'This will show when nothing is being passed in'} </h3>
				{infoText}
			</div>
			{showConfirmation ? (
				<div className='signup-form__form'>
					<h4>Thank you for signup. We will get in touch soon!</h4>
				</div>
			) : (
				<form onSubmit={handleSubmit} className='signup-form__form'>
					<div className='signup-form__name-container'>
						<TextInput inputName='firstName' label='First Name' value={formData.firstName} onChange={onChange} />
						<TextInput inputName='lastName' label='Last Name' value={formData.lastName} onChange={onChange} />
					</div>
					<TextInput inputName='email' label='Your e-mail address' value={formData.email} onChange={onChange} />
					<TextInput inputName='phone' label='Your telephone number' value={formData.phone} onChange={onChange} />
					{errorMessage && <h4 className='copy signup-form__error'>{errorMessage}</h4>}

					<button type='submit' className='btn btn--medium btn--turquoise'>
						{buttonLabel || 'Stay in touch!'}
					</button>
					{pricing && (
						<div className='signup-form__pricing'>
							<h4>Pricing</h4>
							<p className='copy'>
								Single Room: <span className='bold'>{pricing.singlePrice} € per person</span>
							</p>
							<p className='copy'>
								Shared Room: <span className='bold'>{pricing.sharedPrice} € per person</span>{' '}
							</p>
						</div>
					)}
				</form>
			)}
		</section>
	);
};

export default SignupForm;
