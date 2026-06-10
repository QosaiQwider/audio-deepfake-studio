const API_URL =
    "https://0baf-34-87-74-182.ngrok-free.app";

const audioFile =
    document.getElementById("audioFile");

const fileName =
    document.getElementById("fileName");

const detectBtn =
    document.getElementById("detectBtn");

const resultCard =
    document.getElementById("resultCard");

const predictionBadge =
    document.getElementById("predictionBadge");

const confidenceValue =
    document.getElementById("confidenceValue");

const confidenceBar =
    document.getElementById("confidenceBar");

const realScore =
    document.getElementById("realScore");

const fakeScore =
    document.getElementById("fakeScore");

const previewAudio =
    document.getElementById("previewAudio");

const clearDetection =
    document.getElementById("clearDetection");


audioFile.addEventListener("change", () => {

    if (audioFile.files.length > 0) {

        fileName.innerText =
            audioFile.files[0].name;

        previewAudio.src =
            URL.createObjectURL(
                audioFile.files[0]
            );
    }
});


detectBtn.addEventListener("click", async () => {

    const file =
        audioFile.files[0];

    if (!file) {

        alert("Please upload audio first");

        return;
    }

    try {

        detectBtn.disabled = true;

        detectBtn.innerText =
            "Detecting...";

        resultCard.style.display =
            "none";

        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );

        const response =
            await fetch(
                API_URL + "/api/detect",
                {
                    method: "POST",
                    body: formData
                }
            );

        if (!response.ok) {

            throw new Error(
                "Detection API Error"
            );
        }

        const data =
            await response.json();

        const prediction =
            data.prediction.toLowerCase();

        const confidence =
            Number(data.confidence);

        predictionBadge.className = "";

        if (prediction === "fake") {

            predictionBadge.innerText =
                "AI GENERATED";

            predictionBadge.classList.add(
                "fake-badge"
            );

        } else {

            predictionBadge.innerText =
                "REAL AUDIO";

            predictionBadge.classList.add(
                "real-badge"
            );
        }

        confidenceValue.innerText =
            confidence + "%";

        confidenceBar.style.width =
            confidence + "%";

        realScore.innerText =
            data.real_score + "%";

        fakeScore.innerText =
            data.fake_score + "%";

        previewAudio.src =
            URL.createObjectURL(file);

        resultCard.style.display =
            "block";

    } catch (error) {

        console.error(error);

        alert("Detection failed");

    } finally {

        detectBtn.disabled = false;

        detectBtn.innerText =
            "Detect Audio";
    }
});


clearDetection.addEventListener("click", () => {

    audioFile.value = "";

    fileName.innerText =
        "Upload WAV File";

    previewAudio.src = "";

    resultCard.style.display =
        "none";

    predictionBadge.className =
        "fake-badge";

    predictionBadge.innerText =
        "Waiting For Analysis";

    confidenceValue.innerText =
        "--";

    confidenceBar.style.width =
        "0%";

    realScore.innerText =
        "--";

    fakeScore.innerText =
        "--";
});