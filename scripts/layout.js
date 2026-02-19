async function loadLayout() {
    try {
        // Header
        const headerRes = await fetch('header.html');
        const headerHtml = await headerRes.text();
        document.getElementById('header-container').innerHTML = headerHtml;

        // Footer
        const footerRes = await fetch('footer.html');
        const footerHtml = await footerRes.text();
        document.getElementById('footer-container').innerHTML = footerHtml;

        // Profile
        setupGlobalProfile();

        console.log("Layout and Profile Ready");
        document.dispatchEvent(new Event('layoutReady'));

    } catch (error) {
        console.error(error);
    }
}

function setupGlobalProfile() {
    const teamData = JSON.parse(localStorage.getItem("goldenScroll_team"));
    if (!teamData) return;

    const profileBtn = document.getElementById('team-profile');
    if (profileBtn) {
        const cleanAvatar = teamData.avatar.replace('../', '').replace('./', '');
        profileBtn.style.backgroundImage = `url('${cleanAvatar}')`;
        profileBtn.style.backgroundSize = 'cover';
    }
}

loadLayout();