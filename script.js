let currentStep = 1;

document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
});

function getTotalSteps() {
    return document.querySelectorAll('.slide').length;
}

function updateNavigation() {
    const totalSteps = getTotalSteps();

    document.querySelectorAll('.slide').forEach((slide, idx) => {
        slide.classList.toggle('active', idx + 1 === currentStep);
    });

    const counterElem = document.getElementById('step-counter');
    if (counterElem) {
        counterElem.innerText = `Paso ${currentStep} de ${totalSteps}`;
    }
    
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        const progressPercent = (currentStep / totalSteps) * 100;
        progressFill.style.width = `${progressPercent}%`;
    }

    document.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx + 1 === currentStep);
    });

    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (btnPrev) btnPrev.disabled = (currentStep === 1);
    if (btnNext) btnNext.disabled = (currentStep === totalSteps);
}

function changeSlide(direction) {
    const totalSteps = getTotalSteps();
    const newStep = currentStep + direction;
    if (newStep >= 1 && newStep <= totalSteps) {
        currentStep = newStep;
        updateNavigation();
        const mainElem = document.querySelector('.main-container');
        if (mainElem) mainElem.scrollTop = 0;
    }
}

function selectOption(button, optionIndex) {
    const questionBox = button.closest('.quiz-question');
    questionBox.querySelectorAll('.opt-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    questionBox.dataset.userAnswer = optionIndex;
}

function evaluateQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    let score = 0;

    questions.forEach(q => {
        const correctAnswer = parseInt(q.dataset.correct);
        const userAnswer = parseInt(q.dataset.userAnswer);

        if (userAnswer === correctAnswer) {
            score++;
        }
    });

    document.getElementById('quiz-container').classList.add('hidden');
    const resultBox = document.getElementById('quiz-result');
    resultBox.classList.remove('hidden');

    document.getElementById('score-text').innerText = `Obtuviste ${score} de ${questions.length} respuestas correctas.`;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        changeSlide(1);
    } else if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    }
});