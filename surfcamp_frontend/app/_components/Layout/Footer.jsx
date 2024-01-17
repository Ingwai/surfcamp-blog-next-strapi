import Link from 'next/link';
import React from 'react';

const Footer = () => {
	const navItems = [
		{
			display: 'the camp.',
			slug: '/',
		},
		{
			display: 'the experience.',
			slug: '/experience',
		},
		{
			display: 'the blog.',
			slug: '/blog',
		},

		{
			display: 'the events.',
			slug: '/events',
		},
	];

	const policies = [
		{
			display: 'Imprint',
			slug: '/imprint',
		},
		{
			display: 'Terms and Conditions',
			slug: '/toc',
		},
		{
			display: 'Data Protection',
			slug: '/data-protection',
		},
	];

	return (
		<div>
			<footer className='footer'>
				<nav className='footer__nav'>
					<img className='footer__logo' src='/assets/logo.svg' alt='logo' />
					<ul className='footer__links'>
						{navItems.map(item => (
							<li key={item.display}>
								<Link href={item.slug}>
									<h5>{item.display}</h5>
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<div className='footer__policies'>
					<ul className='footer__policies-nav'>
						{policies.map(policy => (
							<li key={policy.display}>
								<p className='copy'>{policy.display}</p>
							</li>
						))}
					</ul>
					<p className='copy'>© Sam’s Surfcamp - all rights reserved</p>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
