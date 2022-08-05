// store/index.js
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { io } from "socket.io-client";
import create from 'zustand';
const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);

const initialState = {
    socket: socket,
    username: "",
    gameMode: "singleplayer",
    gameCode: "",
    score: 0,
    answerStreak: 0,
    opponentScore: 0,
    opponentCorrect: 0,
    opponentIncorrect: 0,
    opponentHighScore: 0,
    time: "init",
    highScore: 0,
    isSound: localStorage.getItem('isSound') || true,
    isMusic: localStorage.getItem('isMusic') || true,
    isFullScreen: false,
    gameOver: "init",
    gamePause: "init",
    gameStart: "init",
    gameWon: false,
    answer: "",
    lastAnswer: "",
    selectedChoice: null,
    questionSet: [],
    questionNumber: 0,
    choices: [],
    targetCity: [],
    playBy: "",
    correctCount: 0,
    incorrectCount: 0,
    updateQ: "init",
    choiceModal: false,
    isQuesCorr: "init",
}

const useStore = create(set => ({
    ...initialState,
    setGameMode: (mode) => set(state => ({
        gameMode: mode
    })),
    setGameCode: (val) => set(state => ({
        gameCode: val
    })),
    addScore: (val) => set(state => ({
        score: state.score + parseInt(val)
    })),
    addAnswerStreak: (val) => set(state => ({
        answerStreak: state.answerStreak + val
    })),
    resetAnswerStreak: () => set(state => ({
        answerStreak: 0
    })),
    addOpponentScore: (val) => set(state => ({
        opponentScore: state.opponentScore + val
    })),
    addOpponentCorrect: (val) => set(state => ({
        opponentCorrect: state.opponentCorrect + val
    })),
    addOpponentIncorrect: (val) => set(state => ({
        opponentIncorrect: state.opponentIncorrect + val
    })),
    addOpponentHighScore: (val) => set(state => ({
        opponentHighScore: state.opponentHighScore + val
    })),
    setTime: (time) => set(state => ({
        time: time
    })),
    toggleSound: () => set(state => ({
        isSound: !state.isSound
    })),
    toggleMusic: () => set(state => ({
        isMusic: !state.isMusic
    })),
    toggleFullScreen: () => set(state => ({
        isFullScreen: !state.isFullScreen
    })),
    setGameOver: (val) => set(state => ({
        gameOver: val
    })),
    setGamePause: (val) => set(state => ({
        gamePause: val
    })),
    setGameStart: (val) => set(state => ({
        gameStart: val
    })),
    setGameWon: (val) => set(state => ({
        gameWon: val
    })),
    setQuestionSet: (questionSet) => set((state) => (
        {
            questionSet: questionSet
        }
    )),
    setAnswer: () => set((state) => (
        {
            answer: state.choices[state.choices.findIndex(x => x.status == "correct")].name
        }
    )),
    setLastAnswer: (val) => set((state) => (
        {
            lastAnswer: val
        }
    )),
    setSelectedChoice: (choice) => set((state) => (
        {
            selectedChoice: choice
        }
    )),
    addQuestionNumber: (val) => set((state) => (
        {
            questionNumber: state.questionNumber + val
        }
    )),
    setChoices: () => set((state) => (
        {
            choices: state.questionSet[state.questionNumber].sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            })
        }
    )),
    setTargetCity: () => set((state) => (
        {
            targetCity: state.choices[state.choices.findIndex(x => x.status == "correct")]
        }
    )),

    setPlayBy: (val) => set((state) => (
        {
            playBy: val
        }
    )),
    incrementCorrectCount: () => set((state) => (
        {
            correctCount: state.correctCount + 1
        }
    )),
    incrementIncorrectCount: () => set((state) => (
        {
            incorrectCount: state.incorrectCount + 1
        }
    )),
    setUpdateQ: (val) => set((state) => (
        {
            updateQ: val
        }
    )),
    setChoiceModal: (val) => set((state) => (
        {
            choiceModal: val
        }
    )),
    setIsQuesCorr: (val) => set((state) => (
        {
            isQuesCorr: val
        }
    )),
    resetState: (val = null) => set(state => (
        val ? {
            ...state,
            isSound: val.isSound,
            isMusic: val.isMusic,
        } : initialState
    )
    )
}));

mountStoreDevtool('Store', useStore);

export default useStore;
