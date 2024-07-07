const totalQuestions = 10;
let currentQuestion = 1;
let answers = {};
let questions = [
    {
        question: "What's my favourite ice cream flavour?",
        image: "https://healthwire.pk/wp-content/uploads/2022/06/advantage-and-disadvantage-of-eating-icecream.jpg",
        options: ["Chocolate", "Vanilla", "ButterScotch", "Strawberry"]
    },
    {
        question: "What type of season do I enjoy the most?",
        image: "https://media.licdn.com/dms/image/C4D12AQHRsnnNXSFmOA/article-cover_image-shrink_600_2000/0/1619427516457?e=2147483647&v=beta&t=MamRa6S4r-oIqKq325xykdwqruCAV0e7VGJwZaaRpbg",
        options: ["Winter", "Summers", "Spring", "Rainy"]
    },
    {
        question: "Which of these describes my personality?",
        image: "https://www.21kschool.com/in/wp-content/uploads/sites/4/2022/10/5-Tips-For-Students-For-Personality-Development.png",
        options: ["Friendly", "Funny", "Kind", "Angry Bird"]
    },
    {
        question: "What do I prefer?",
        image: "https://i.pinimg.com/originals/aa/a3/df/aaa3dffd7edf6c79bd47b8246bd79d43.jpg",
        options: ["Mountain", "Beach"]
    },
    {
        question: "What do I use the most?",
        image: "https://thedailyguardian.com/wp-content/uploads/2024/01/SOCIAL-MEDIA.jpg",
        options: ["Instagram", "WhatsApp", "Facebook", "Snapchat"]
    },
    {
        question: "What helps me chill out?",
        image: "https://i.ytimg.com/vi/IBKIzCxy55o/sddefault.jpg?v=62c81891",
        options: ["Sleeping", "Reading", "Listening Music", "Scrolling Reels"]
    },
    {
        question: "What type of movies do I like the most?",
        image: "https://lajoyalink.com/wp-content/uploads/2018/03/Movie.jpg",
        options: ["Horror", "Romantic", "Thriller", "Comedy"]
    },
    {
        question: "Which life do I think is better?",
        image: "https://upload.wikimedia.org/wikipedia/en/0/07/Lifetitle.jpg",
        options: ["Single", "Committed", "One Sided", "Married"]
    },
    {
        question: "What's my favourite drink?",
        image: "https://thumbs.dreamstime.com/b/soft-drinks-11566390.jpg",
        options: ["Juice", "Tea", "Coffee", "Beer"]
    },
    {
        question: "What's my favourite type of cuisine?",
        image: "https://res.cloudinary.com/grand-canyon-university/image/fetch/w_750,h_564,c_fill,g_faces,q_auto/https://www.gcu.edu/sites/default/files/media/images/Blog/Content%20Campaigns/shutterstock_1383065213.jpg",
        options: ["Chinese", "South Indian", "Italian", "North Indian"]
    }
];

function startQuiz() {
    currentQuestion = 1;
    answers = {};
    displayQuestion();
}

function displayQuestion() {
    const quizContainer = document.getElementById('quiz');
    const question = questions[currentQuestion - 1];
    let optionsHtml = question.options.map((option, index) => {
        return `<li><button onclick="selectOption(${index})">${option}</button></li>`;
    }).join('');
    quizContainer.innerHTML = `
        <div class="quiz-container">
            <div class="progress">Question ${currentQuestion} of ${totalQuestions}</div>
            <h2>${question.question}</h2>
            <img src="${question.image}" alt="Question Image">
            <ul>${optionsHtml}</ul>
        </div>
    `;
}

function selectOption(optionIndex) {
    answers[currentQuestion - 1] = optionIndex;
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        displayQuestion();
    } else {
        generateLink();
    }
}

function generateLink() {
    const baseUrl = window.location.href.split('?')[0];
    const answersParam = encodeURIComponent(JSON.stringify(answers));
    const link = `${baseUrl}?quiz=${answersParam}`;
    displayResults(link);
}

function displayResults(link) {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = `
        <div class="results">
            <h2>Quiz Created!</h2>
            <p>Share this link with your friends:</p>
            <input type="text" value="${link}" id="quiz-link" readonly>
            <button onclick="copyLink()">Copy Link</button>
            <p><a href="#" onclick="startQuiz()">Create Your Own Quiz</a></p>
        </div>
    `;
}

function copyLink() {
    const linkInput = document.getElementById('quiz-link');
    linkInput.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
}

function calculateScore(answers1, answers2) {
    let score = 0;
    for (let i = 0; i < answers1.length; i++) {
        if (answers1[i] === answers2[i]) {
            score++;
        }
    }
    return score;
}

function startQuizWithAnswers(quizAnswers) {
    currentQuestion = 1;
    const userAnswers = [];
    function displayQuizQuestion() {
        const quizContainer = document.getElementById('quiz');
        const question = questions[currentQuestion - 1];
        let optionsHtml = question.options.map((option, index) => {
            return `<li><button onclick="selectQuizOption(${index})">${option}</button></li>`;
        }).join('');
        quizContainer.innerHTML = `
            <div class="quiz-container">
                <div class="progress">Question ${currentQuestion} of ${totalQuestions}</div>
                <h2>${question.question}</h2>
                <img src="${question.image}" alt="Question Image">
                <ul>${optionsHtml}</ul>
            </div>
        `;
    }

    function selectQuizOption(optionIndex) {
        userAnswers[currentQuestion - 1] = optionIndex;
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            displayQuizQuestion();
        } else {
            const score = calculateScore(quizAnswers, userAnswers);
            displayFinalScore(score);
        }
    }

    function displayFinalScore(score) {
        const quizContainer = document.getElementById('quiz');
        quizContainer.innerHTML = `
            <div class="results">
                <h2>Quiz Completed!</h2>
                <p>Your score: ${score} out of ${totalQuestions}</p>
                <p><a href="#" onclick="startQuiz()">Create Your Own Quiz</a></p>
            </div>
        `;
    }

    displayQuizQuestion();
}

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const quizParam = urlParams.get('quiz');
    if (quizParam) {
        const quizAnswers = JSON.parse(decodeURIComponent(quizParam));
        startQuizWithAnswers(quizAnswers);
    }
};
