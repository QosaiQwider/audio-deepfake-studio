const API_URL =
    "https://32c6-35-198-196-42.ngrok-free.app";

const voice =
    localStorage.getItem("selectedVoice")
    || "David Attenborough";

function updateVoice(voice) {

    document.getElementById(
        "voiceTitle"
    ).innerText = voice;

    const img =
        document.getElementById(
            "voiceImage"
        );

    switch (voice) {

        case "David Attenborough":

            img.src =
                "../assets/images/David.jpg";

            break;

        case "Morgan Freeman":

            img.src =
                "../assets/images/Morgan.jpg";

            break;

        case "Father Christmas":

            img.src =
                "../assets/images/Father.jpg";

            break;

        case "Jennifer Aniston":

            img.src =
                "../assets/images/Jennifer.jpg";

            break;

        case "Custom Voice":

            img.src =
                "../assets/images/custom.png";

            break;

        default:

            img.src =
                "../assets/images/custom.png";
    }

    const celebritySection =
        document.getElementById(
            "celebritySection"
        );

    const customSection =
        document.getElementById(
            "customSection"
        );

    if (
        voice === "Custom Voice"
    ) {

        celebritySection.style.display =
            "none";

        customSection.style.display =
            "block";

    }
    else {

        celebritySection.style.display =
            "block";

        customSection.style.display =
            "none";

    }
}

updateVoice(voice);

document.getElementById(
    "davidBtn"
).addEventListener("click", () => {

    localStorage.setItem(
        "selectedVoice",
        "David Attenborough"
    );

    updateVoice(
        "David Attenborough"
    );

});

document.getElementById(
    "morganBtn"
).addEventListener("click", () => {

    localStorage.setItem(
        "selectedVoice",
        "Morgan Freeman"
    );

    updateVoice(
        "Morgan Freeman"
    );

});

document.getElementById(
    "fatherBtn"
).addEventListener("click", () => {

    localStorage.setItem(
        "selectedVoice",
        "Father Christmas"
    );

    updateVoice(
        "Father Christmas"
    );

});

document.getElementById(
    "jenniferBtn"
).addEventListener("click", () => {

    localStorage.setItem(
        "selectedVoice",
        "Jennifer Aniston"
    );

    updateVoice(
        "Jennifer Aniston"
    );

});

document.getElementById(
    "customBtn"
).addEventListener("click", () => {

    localStorage.setItem(
        "selectedVoice",
        "Custom Voice"
    );

    updateVoice(
        "Custom Voice"
    );

});
document
    .getElementById("generateBtn")
    .addEventListener(
        "click",
        async () => {

            console.log("BUTTON CLICKED");
            const currentVoice =
                localStorage.getItem(
                    "selectedVoice"
                ) || "David Attenborough";

            const text =
                document
                    .getElementById(
                        "inputText"
                    )
                    .value;

            if (!text.trim()) {

                alert(
                    "Please enter text"
                );

                return;
            }

            const generateBtn =
                document.getElementById(
                    "generateBtn"
                );

            const outputCard =
                document.getElementById(
                    "outputCard"
                );

            try {

                generateBtn.disabled = true;

                generateBtn.innerHTML =
                    "Generating...";

                outputCard.style.display =
                    "none";

                let endpoint =
                    "/api/david";

                if (
                    currentVoice ===
                    "Morgan Freeman"
                ) {

                    endpoint =
                        "/api/morgan";
                }

                else if (
                    currentVoice ===
                    "Father Christmas"
                ) {

                    endpoint =
                        "/api/father";
                }

                else if (
                    currentVoice ===
                    "Jennifer Aniston"
                ) {

                    endpoint =
                        "/api/julia";
                }

                const formData =
                    new FormData();

                formData.append(
                    "text",
                    text
                );

                const response =
                    await fetch(
                        API_URL + endpoint,
                        {
                            method: "POST",
                            body: formData
                        }
                    );

                if (!response.ok) {

                    throw new Error(
                        "API Error"
                    );
                }

                const blob =
                    await response.blob();

                const audioUrl =
                    URL.createObjectURL(
                        blob
                    );

                const player =
                    document.getElementById(
                        "resultAudio"
                    );

                player.src =
                    audioUrl;

                outputCard.style.display =
                    "block";

            }

            catch (error) {

                console.error(error);

                alert(
                    "Voice generation failed"
                );
            }

            finally {

                generateBtn.disabled =
                    false;

                generateBtn.innerHTML =
                    "▶ Generate Voice";
            }
        }
    );
const referenceAudio =
    document.getElementById("referenceAudio");

const referenceFileName =
    document.getElementById("referenceFileName");

if (referenceAudio) {

    referenceAudio.addEventListener("change", () => {

        if (referenceAudio.files.length > 0) {

            referenceFileName.innerText =
                referenceAudio.files[0].name;
        }
    });
}

document
    .getElementById("customGenerateBtn")
    .addEventListener("click", async () => {

        const text =
            document.getElementById("customText").value;

        const file =
            document.getElementById("referenceAudio").files[0];

        if (!file) {
            alert("Please upload reference audio");
            return;
        }

        if (!text.trim()) {
            alert("Please enter text");
            return;
        }

        const btn =
            document.getElementById("customGenerateBtn");

        const outputCard =
            document.getElementById("outputCard");

        try {

            btn.disabled = true;
            btn.innerHTML = "Generating...";

            outputCard.style.display = "none";

            const formData = new FormData();

            formData.append("text", text);
            formData.append("file", file);

            const response = await fetch(
                API_URL + "/api/custom-voice",
                {
                    method: "POST",
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error("Custom voice generation failed");
            }

            const blob = await response.blob();

            const audioUrl =
                URL.createObjectURL(blob);

            document.getElementById("resultAudio").src =
                audioUrl;

            outputCard.style.display = "block";

        } catch (error) {

            console.error(error);
            alert("Custom voice generation failed");

        } finally {

            btn.disabled = false;
            btn.innerHTML = "▶ Generate Voice";
        }
    });
let currentAudioUrl = null;

document.getElementById("downloadBtn")
    ?.addEventListener("click", () => {

        const audio = document.getElementById("resultAudio");

        if (!audio.src) {
            alert("No audio to download");
            return;
        }

        const a = document.createElement("a");
        a.href = audio.src;
        a.download = "generated_voice.wav";
        a.click();
    });


document.getElementById("clearBtn")
    ?.addEventListener("click", () => {

        const inputText = document.getElementById("inputText");
        const customText = document.getElementById("customText");
        const resultAudio = document.getElementById("resultAudio");
        const outputCard = document.getElementById("outputCard");
        const referenceAudio = document.getElementById("referenceAudio");
        const referenceFileName = document.getElementById("referenceFileName");

        if (inputText) inputText.value = "";
        if (customText) customText.value = "";
        if (referenceAudio) referenceAudio.value = "";
        if (referenceFileName) referenceFileName.innerText = "Drop .wav or .mp3 here";

        resultAudio.pause();
        resultAudio.src = "";

        outputCard.style.display = "none";
    });


document.getElementById("speedBtn")
    ?.addEventListener("click", () => {

        const menu = document.getElementById("speedMenu");

        menu.style.display =
            menu.style.display === "block"
                ? "none"
                : "block";
    });


document.querySelectorAll("#speedMenu button")
    .forEach((btn) => {

        btn.addEventListener("click", () => {

            const speed = parseFloat(btn.dataset.speed);

            document.getElementById("resultAudio").playbackRate = speed;

            document.getElementById("speedBtn").innerText =
                speed + "x";

            document.getElementById("speedMenu").style.display =
                "none";
        });
    });
