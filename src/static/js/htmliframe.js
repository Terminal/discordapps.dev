const iframeLoaded = () => {
	const iFrameID = document.getElementById('iframe');
	if (iFrameID) {
		// here you can make the height, I delete it first, then I make it again
		iFrameID.style = '';
		iFrameID.style = `height: ${iFrameID.contentWindow.document.body.scrollHeight + 10}px`;
	}
};
