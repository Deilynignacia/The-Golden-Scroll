// Header & Footer
async function loadLayout() {
    try {
        // Header & Modal
        const headerRes = await fetch('header.html');
        const headerHtml = await headerRes.text();
        document.getElementById('header-container').innerHTML = headerHtml;

        // Footer
        const footerRes = await fetch('footer.html');
        const footerHtml = await footerRes.text();
        document.getElementById('footer-container').innerHTML = footerHtml;

        console.log("Success");
        document.dispatchEvent(new Event('layoutReady'));

    } catch (error) {
        console.error(error);
    }
}

loadLayout();