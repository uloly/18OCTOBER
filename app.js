/*
    ============================================
    BIRTHDAY 18
    ============================================
*/
/* الأسئلة الأساسية */
const data = {
    questions: [
        {
            q: "من هو حارس البث و باتمان الكومنت ؟",
            answers: ["رياض", "بنت المديره", "67 هيبه", "عمو اشحن لي"],
            correct: 0,
            wrongResponse: "ماتعرفين حارس البث رياض ازعل و ارسل دونيشن"
        },
        {
            q: "اميرة عمان و اقوى مصممة في التيك",
            answers: ["نوف", "نفف", "سيلينا جوميز", "بش خان"],
            correct: 0,
            wrongResponse: "هي عمان عندها اميره غير نوف ؟"
        },
        {
            q: "خانت السويدات و صارت تدو هيبات",
            answers: ["رنو", "لولي", "مونير", "عايض"],
            correct: 0,
            wrongResponse: "الحق علي صعبت الخيارات"
        },
        {
            q: "يالافضل تعليقي ولعبينا كراسي",
            answers: ["محمود", "تسلا", "امون", "روم مستودع"],
            correct: 0,
            wrongResponse: "جدي الله يرحمه يعرف ان الجواب محمود"
        },
        {
            q: "كوتش ايمون فرع البث",
            answers: ["فهد", "محمد النونو (دمبل مو كوتش)", "جانتي", "ايفون 18نزل تهادو تحابو"],
            correct: 0,
            wrongResponse: "لو اسوي لك حركة شوبرا بتعرف الجواب ؟"
        },
        {
            q: "صلوا على النبي",
            answers: ["يارب ندخل الجنة كلنا", "يارب احمد يدخل الجنة", "يارب بيتزا يدخل الجنة", "يارب tznh يدخل الجنة"],
            correct: 0,
            wrongResponse: "جنون العظمة خف شوي ب اخر لحظة"
        },
        {
            q: "يقلد لولي ف كل شي الا لعبها ما قدر له",
            answers: ["فيصل", "نايف", "شاروخان", "زبادي يوناني"],
            correct: 0,
            wrongResponse: "اول شي نستبعد فيصل لانه هو الجواب الصح"
        },
        {
            q: "كريم و وافي و يسعد لولي و الجميع له من اسمه نصيب",
            answers: ["لوف", "حمود (جبر خاطر ممكن يدخلني الجنة)", "امون (جبر خاطر برو ماكس)", "بيتزا"],
            correct: 0,
            wrongResponse: "اكيد بيتزا مايبي لها تفكير"
        },
        {
            q: "الافضل و القلب الطيب البنت الي تنور يوم ال 18 ب ميلادها",
            answers: ["لولي", "زينب", "نو مغسي", "انا جوعان"],
            correct: 0,
            wrongResponse: "شفت كل شي الا احد ما يعرف نفسه اول مره اشوف"
        }
    ]
};
/* المتغيرات */
let questionIndex = 0;
let score = 0;
let locked = false;
let displayedAnswerIndexes = [];
const birthdaySong = document.getElementById("birthdaySong");
const playButton = document.getElementById("playButton");
const progressTrack = document.getElementById("progressTrack");

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainder}`;
}

function updateMusicProgress() {
    const progress = birthdaySong.duration
        ? birthdaySong.currentTime / birthdaySong.duration * 100
        : 0;
    document.getElementById("progressFill").style.width = `${progress}%`;
    document.getElementById("pandaProgress").style.left = `${progress}%`;
    document.getElementById("currentTime").textContent = formatTime(birthdaySong.currentTime);
}

if (birthdaySong && playButton) {
    birthdaySong.addEventListener("canplay", () => {
        document.getElementById("musicPlayer").classList.remove("unavailable");
    });
    birthdaySong.addEventListener("loadedmetadata", () => {
        document.getElementById("duration").textContent = formatTime(birthdaySong.duration);
    });
    birthdaySong.addEventListener("timeupdate", updateMusicProgress);
    birthdaySong.addEventListener("ended", () => {
        playButton.textContent = "▶";
        playButton.setAttribute("aria-label", "تشغيل الأغنية");
    });
    birthdaySong.addEventListener("error", () => {
        document.getElementById("musicPlayer").classList.add("unavailable");
    });
    playButton.addEventListener("click", () => {
        if (birthdaySong.paused) {
            const playRequest = birthdaySong.play();
            if (playRequest) {
                playRequest.then(() => {
                    playButton.textContent = "Ⅱ";
                    playButton.setAttribute("aria-label", "إيقاف الأغنية");
                }).catch(() => {
                    document.getElementById("musicPlayer").classList.add("unavailable");
                });
            }
        } else {
            birthdaySong.pause();
            playButton.textContent = "▶";
            playButton.setAttribute("aria-label", "تشغيل الأغنية");
        }
    });
    progressTrack.addEventListener("click", event => {
        if (!birthdaySong.duration) return;
        const bounds = progressTrack.getBoundingClientRect();
        const position = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
        birthdaySong.currentTime = position * birthdaySong.duration;
    });
}

/* تغيير الشاشة */
function showScreen(id) {
    document
        .querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.remove("active");
        });
    document
        .getElementById(id)
        .classList.add("active");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
/* البداية */
function startExperience() {
    showScreen("quiz");
    renderQuestion();
}
function setFeedback(message, isWrong = false) {
    const feedback = document.getElementById("feedback");
    if (!feedback) return;
    feedback.textContent = message;
    feedback.classList.toggle("wrong-feedback", isWrong);
    feedback.style.display = "block";
}

/* عرض السؤال */
function renderQuestion() {
    /*
        إذا وصلنا إلى 18
    */
    if (score >= 18) {
        showSuccess();
        return;
    }
    /*
        إذا انتهت الأسئلة
    */
    if (
        questionIndex >=
        data.questions.length
    ) {
        questionIndex = 0;
    }
    const question =
        data.questions[questionIndex];
    document
        .getElementById("score")
        .textContent =
        score;
    document
        .getElementById("questionNumber")
        .textContent =
        `السؤال ${questionIndex + 1}`;
    document
        .getElementById("question")
        .textContent =
        question.q;
    const feedback =
        document.getElementById("feedback");
    feedback.textContent = "";
    feedback.classList.remove(
        "wrong-feedback"
    );
    feedback.style.display = "block";
    const answersBox =
        document.getElementById("answers");
    answersBox.innerHTML = "";
    displayedAnswerIndexes = question.answers.map((_, index) => index);
    displayedAnswerIndexes.sort(() => Math.random() - 0.5);
    displayedAnswerIndexes.forEach(
        (answerIndex, displayIndex) => {
            const button =
                document.createElement("button");
            button.className =
                "answer";
            button.textContent =
                question.answers[answerIndex];
            button.onclick =
                () =>
                    answerQuestion(
                        displayIndex,
                        button
                    );
            answersBox.appendChild(
                button
            );
        }
    );
}
/* الإجابة */
function answerQuestion(
    selected,
    button
) {
    if (locked) return;
    locked = true;
    const question =
        data.questions[questionIndex];
    const buttons =
        document.querySelectorAll(
            ".answer"
        );
    buttons.forEach(
        b =>
            b.disabled = true
    );
    if (
        displayedAnswerIndexes[selected] ===
        question.correct
    ) {
        score += 2;
        button.classList.add(
            "correct"
        );
        document
            .getElementById("feedback")
            .textContent =
            "صح! +2 ⭐";
    }
    else {
        button.classList.add(
            "wrong"
        );
        const wrongMessage =
            question.wrongResponse ||
            "إجابة خاطئة، حاول مرة أخرى 💬";
        setFeedback(wrongMessage, true);
        setTimeout(
            () => {
                locked = false;
                renderQuestion();
            },
            5000
        );
        return;
    }
    document
        .getElementById("score")
        .textContent =
        score;
    setTimeout(
        () => {
            questionIndex++;
            locked = false;
            renderQuestion();
        },
        800
    );
}
/* الوصول إلى 18 */
function showSuccess() {
    if (score >= 18) {
        showScreen("success");
    }
    else {
        /*
            إذا انتهت الأسئلة قبل 18
            نبدأ جولة جديدة.
        */
        questionIndex = 0;
        renderQuestion();
    }
}
/* الكعكة */
function openCake() {
    showScreen("cake");
}
/* صورة غير موجودة */
function showPhotoPlaceholder() {
    const placeholder =
        document.getElementById(
            "photoPlaceholder"
        );
    placeholder.style.display =
        "flex";
}
/* إطفاء الشموع */
function blowCandles() {
    const candles =
        document.querySelectorAll(
            ".candle"
        );
    candles.forEach(
        (candle, index) => {
            setTimeout(
                () => {
                    candle.classList.add(
                        "off"
                    );
                },
                index * 80
            );
        }
    );
    document
        .getElementById("blowButton")
        .disabled = true;
    /*
        بعد إطفاء آخر شمعة
    */
    setTimeout(
        () => {
            document
                .getElementById(
                    "finalMessage"
                )
                .classList.add(
                    "show"
                );
            document
                .getElementById(
                    "finalMessage"
                )
                .scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            createHearts();
        },
        1800
    );
}
/* القلوب */
function createHearts() {
    const hearts = [
        "💗",
        "🩷",
        "💕",
        "💖",
        "💞"
    ];
    for (
        let i = 0;
        i < 80;
        i++
    ) {
        setTimeout(
            () => {
                const heart =
                    document.createElement(
                        "div"
                    );
                heart.className =
                    "floating-heart";
                heart.textContent =
                    hearts[
                        Math.floor(
                            Math.random() *
                            hearts.length
                        )
                    ];
                heart.style.left =
                    Math.random() *
                    100 +
                    "vw";
                heart.style.top =
                    "100vh";
                heart.style.animationDuration =
                    2.5 +
                    Math.random() * 2 +
                    "s";
                document
                    .getElementById(
                        "hearts"
                    )
                    .appendChild(
                        heart
                    );
                setTimeout(
                    () => {
                        heart.remove();
                    },
                    5000
                );
            },
            i * 45
        );
    }
}