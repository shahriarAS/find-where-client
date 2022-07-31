// store/index.js

import { mountStoreDevtool } from 'simple-zustand-devtools';
import create from 'zustand';
import generatePosition from '../utils/generatePosition';
// const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);

const initialState = {
    // socket: socket,
    username: "",
    gameMode: "singleplayer",
    gameCode: "",
    score: 0,
    continousScore: 0,
    opponentScore: 0,
    maxLevel: 7,
    hintTook: 0,
    level: localStorage.getItem('gameLevel') || 1,
    time: "init",
    highScore: 0,
    bestTime: 0,
    isSound: localStorage.getItem('isSound') || true,
    isMusic: localStorage.getItem('isMusic') || true,
    difficulty: localStorage.getItem('difficulty') || "normal",
    isFullScreen: false,
    gameOver: "init",
    gamePause: "init",
    gameBonus: "init",
    gameStart: "init",
    gameWon: false,
    reduceTime: false,
    showHint: false,
    isLoading: false,
    targetItems: {
        level1: [
            { file: "1_1", position: [54, 40] },
            { file: "1_2", position: [19.5, 18.5] },
            { file: "1_3", position: [50, 8] },
            { file: "1_4", position: [66, 8] },
            { file: "1_5", position: [54, 65] },
            { file: "1_6", position: [69, 30] },
            { file: "2_14", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_15", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
        ],
        level2: [
            { file: "2_1", position: [10, 50] },
            { file: "2_2", position: [55, 4] },
            { file: "2_3", position: [50, 44] },
            { file: "2_4", position: [15, 34] },
            { file: "2_5", position: [77, 24] },
            { file: "2_6", position: [79, 42] },
            { file: "2_18", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_19", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
        ],
        level3: [
            { file: "1_7", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_8", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_9", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_10", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_11", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_12", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_22", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_23", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
        ],
        level4: [
            { file: "2_7", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_8", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_9", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_10", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_11", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_12", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_26", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_27", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
        ],
        level5: [
            { file: "1_13", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_14", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_15", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_16", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_17", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_18", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_10", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_11", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
        ],
        level6: [
            { file: "1_19", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_20", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_21", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_22", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_23", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_24", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_22", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_23", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
        ],
        level7: [
            { file: "1_25", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_26", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_27", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_28", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "1_29", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_13", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_11", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
            { file: "2_12", position: [generatePosition(90, 90).x, generatePosition(90, 90).y] },
        ],
    },
}

const useStore = create(set => ({
    ...initialState,
    setGameMode: (mode) => set(state => ({
        gameMode: mode
    })),
    setGameCode: (val) => set(state => ({
        gameCode: val
    })),
    addScore: (val = 1) => set(state => ({
        score: state.score + val
    })),
    addContinousScore: (val) => set(state => ({
        continousScore: state.continousScore + val
    })),
    resetContinousScore: () => set(state => ({
        continousScore: 0
    })),
    addOpponentScore: () => set(state => ({
        opponentScore: state.opponentScore + 1
    })),
    setLevel: (val) => set(state => ({
        level: val
    })),
    addLevel: () => set(state => ({
        level: state.level + 1
    })),
    addHintTook: () => set(state => ({
        hintTook: state.hintTook + 1
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
    updateDifficulty: (val) => set(state => ({
        difficulty: val
    })),
    toggleFullScreen: () => set(state => ({
        isFullScreen: !state.isFullScreen
    })),
    removeTargetItem: (level, toRemove) => set(state => ({
        targetItems: {
            ...state.targetItems,
            [`level${level}`]: state.targetItems[`level${level}`].filter(item => item.file != toRemove)
        }

    })),
    setGameOver: (val) => set(state => ({
        gameOver: val
    })),
    setGamePause: (val) => set(state => ({
        gamePause: val
    })),
    setGameBonus: (val) => set(state => ({
        gameBonus: val
    })),
    setGameStart: (val) => set(state => ({
        gameStart: val
    })),
    setGameWon: (val) => set(state => ({
        gameWon: val
    })),
    setReduceTime: (val) => set(state => ({
        reduceTime: val
    })),
    setShowHint: (val) => set(state => ({
        showHint: val
    })),
    setIsLoading: (val) => set(state => ({
        isLoading: val
    })),
    addGamePlayed: (val) => set(state => ({
        gamePlayed: [
            ...state.gamePlayed,
            val
        ],
    })),
    resetState: (val = null) => set(state => (
        val ? {
            ...state,
            level: val.level,
            isSound: val.isSound,
            isMusic: val.isMusic,
            difficulty: val.difficulty
        } : initialState
    )
    )
}));

mountStoreDevtool('Store', useStore);

export default useStore;
