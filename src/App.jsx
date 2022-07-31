import { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import GameScreen from "./pages/GameScreen";
import useStore from "./store";

function App() {
  const state = useStore((state) => state)
  // const socket = useStore((state) => state.socket)
  // const [user, loading, error] = useAuthState(auth);


  // const getDataOnce = async () => {
  //   const docRef = doc(db, "users", user.uid);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     const data = docSnap.data()
  //     localStorage.setItem("gameLevel", data.level)
  //     state.resetState({
  //       username: data.username,
  //       highScore: data.highScore,
  //       bestTime: data.bestTime,
  //       level: data.level,
  //       isSound: data.settings.isSound,
  //       isMusic: data.settings.isMusic,
  //       difficulty: data.settings.difficulty
  //     })
  //   } else {
  //     console.log("No such document!");
  //   }
  // }

  // socket.on('connect', () => {
  //   console.log("Connected: ", socket.id)
  // });

  // useEffect(() => {
  //   if (user) {
  //     getDataOnce()
  //     console.log("getDataOnce()")
  //   } else {
  //     state.resetState()
  //     console.log("state.resetState()")
  //   }
  // }, [user]);

  return (
    // loading ? <Loading /> : (
      <div id="app" className="max-w-[1440px] m-auto overflow-x-hidden">
        <Toaster position="top-center" />
        <Routes>
          {/* <Route path="/" element={
            <Layout childComp={<HomePage />} />
          } /> */}
          <Route exact path="/singleplay" element={
            <GameScreen />
          } />
          {/* <Route path="/multiplayer" element={
            user ? <Multiplayer /> : <Layout childComp={<Login />} />
          } /> */}
          {/* <Route path="/new" element={
            <Layout childComp={<NewGameScreen />} />
          } /> */}
          {/* <Route path="/register" element={
            <Layout childComp={user ? <HomePage /> : <Register />} />
          } />
          <Route path="/login" element={
            <Layout childComp={user ? <HomePage /> : <Login />} />
          } />
          <Route path="/settings" element={
            <Layout childComp={<Settings />} />
          } />
          <Route path="/profile" element={
            <Layout childComp={user ? <ProfilePage /> : <Login />} />
          } />
          <Route path="/leaderboard" element={
            <Layout childComp={<Leaderboard />} />
          } />
          <Route path="/page/about" element={
            <Layout childComp={<About />} />
          } />
          <Route path="/page/terms-condition" element={
            <Layout childComp={<TermsCondition />} />
          } />
          <Route path="/page/privacy-policy" element={
            <Layout childComp={<PrivacyPolicy />} />
          } /> */}
          {/* <Route path="*" element={
            <Layout childComp={<h1>404 Not Found</h1>} />
          } /> */}
        </Routes>
      </div>
    // )
  )
}

export default App
