$(() => {
    // Variáveis
    const QUESTION_ELEMENT = $('.question');
    const ANSWERS_ELEMENT = $('.answers');
    const QUESTION_NUMBER_ELEMENT = $('.spnQtd');
    const FINISH_TEXT_ELEMENT = $('.finish span');
    const CONTENT_ELEMENT = $('.content');
    const FINISH_CONTENT_ELEMENT = $('.finish');
    const RESTART_BUTTON = $('.finish-button');
    const PREV_BUTTON = $('#btn-prev');
    const QUESTION_INDICATORS = $('.question-indicators');

    const QUESTIONS = [
        {
            questionName: "Até quantos anos vive um Cerberus?",
            answers: [
                { option: "500 Anos", correct: false },
                { option: "1000 Anos", correct: false },
                { option: "1500 Anos", correct: false },
                { option: "infinitos anos", correct: true }
            ],
        },
        {
            questionName: "No jogo League of Legends existe um personagem chamado Teemo. Qual seu tamanho?",
            answers: [
                { option: "17.63cm", correct: false },
                { option: "25cm", correct: true },
                { option: "60cm", correct: false },
                { option: "100cm", correct: false }
            ],
        },
        {
            questionName: "Qual a equivalência de qualidade de imagem em Pixels de um olho humano?",
            answers: [
                { option: "65 Pixels", correct: false },
                { option: "107 Pixels", correct: true },
                { option: "137 Pixels", correct: true },
                { option: "290 Pixels", correct: false }
            ],
        }
    ];

    let currentIndex = 0;
    let questionsCorrect = 0;
    let userAnswers = [];

    const renderQuestionIndicators = () => {
        QUESTION_INDICATORS.empty();
        QUESTIONS.forEach((_, index) => {
            const indicator = $(`<div class="border border-2 rounded-1 text-white text-center indicator">${index + 1}</div>`);
            if (index < currentIndex) {
                indicator.addClass('correct');
            } else if (index === currentIndex) {
                indicator.addClass('active');
            }
            QUESTION_INDICATORS.append(indicator);
        });
    };

    const renderQuestion = () => {
        QUESTION_NUMBER_ELEMENT.html(`<h1 class="number-question text-white border border-0 rounded-3">${currentIndex + 1}</h1>`);
        const question = QUESTIONS[currentIndex];
        ANSWERS_ELEMENT.empty();
        QUESTION_ELEMENT.text(question.questionName);

        question.answers.forEach((answer) => {
            const button = $(`
                <button class="answer btn text-white text-align-start w-100 mt-custom mt-4" data-option="${answer.option}" data-correct="${answer.correct}">
                    ${answer.option}
                </button>
            `);
            ANSWERS_ELEMENT.append(button);
        });

        bindEvents();
        renderQuestionIndicators();
    };

    const bindEvents = () => {
        ANSWERS_ELEMENT.off('click').on('click', '.answer', handleAnswerClick);
        PREV_BUTTON.off('click').on('click', handlePrevButtonClick);
    };

    const handleAnswerClick = (e) => {
        const button = $(e.target);
        const isCorrect = button.data('correct');
        const selectedOption = button.data('option');

        userAnswers[currentIndex] = {
            option: selectedOption,
            correct: isCorrect
        };

        if (isCorrect) {
            questionsCorrect++;
        }

        if (currentIndex < QUESTIONS.length - 1) {
            currentIndex++;
            renderQuestion();
        } else {
            showFinishScreen();
        }
    };

    const handlePrevButtonClick = () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion();
        }
    };

    const showFinishScreen = () => {
        let resultHtml = `<h2>Você acertou ${questionsCorrect} de ${QUESTIONS.length}</h2>`;
        resultHtml += '<ul>';

        QUESTIONS.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const answerClass = userAnswer ? (userAnswer.correct ? 'answer-correct' : 'answer-incorrect') : '';

            resultHtml += `
                <li>
                    <span class="d-flex w-100 m-1 mt-4 p-2 text-align-start border border-1 rounded-2 align-items-center justify-content-start ${answerClass} answers-result">
                        ${question.questionName}: ${userAnswer ? userAnswer.option : 'Não respondida'}
                    </span>
                </li>
            `;
        });

        resultHtml += '</ul>';

        FINISH_TEXT_ELEMENT.html(resultHtml);
        CONTENT_ELEMENT.hide();
        FINISH_CONTENT_ELEMENT.show();
    };

    const handleRestartButtonClick = () => {
        CONTENT_ELEMENT.show();
        FINISH_CONTENT_ELEMENT.hide();
        currentIndex = 0;
        questionsCorrect = 0;
        userAnswers = [];
        renderQuestion();
    };

    RESTART_BUTTON.on('click', handleRestartButtonClick);

    // Carregar a primeira pergunta
    renderQuestion();
});
