if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
	window.addEventListener('load', () => {
		void navigator.serviceWorker.register('/service-worker.js');
	});
}
