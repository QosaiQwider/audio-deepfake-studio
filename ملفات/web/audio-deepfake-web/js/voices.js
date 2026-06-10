document.addEventListener("DOMContentLoaded", () => {

    const overlay = document.getElementById("voiceOverlay");
    const homeBtn = document.getElementById("goHomeBtn");

    if (sessionStorage.getItem("overlayClosed") === "true") {
        overlay?.remove();
    }
    function closeOverlay() {
        if (overlay) {
            overlay.remove();
        }
    }


    document.querySelectorAll(".voice-item").forEach(item => {

        item.addEventListener("click", () => {

            const voiceName = item.querySelector("span").innerText;

            localStorage.setItem("selectedVoice", voiceName);

            window.location.href =
                "pages/generate.html";
            sessionStorage.setItem("overlayClosed", "true");

            closeOverlay();

        });

    });

    if (homeBtn) {
        homeBtn.addEventListener("click", () => {

            sessionStorage.setItem("overlayClosed", "true");

            closeOverlay();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }

});