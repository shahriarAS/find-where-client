import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function ProfileChart({ userData, graphType }) {
  const gamePlayedData = Object.values(userData.gamePlayed)
  gamePlayedData.sort(function (playDataOne, playDataTwo) {
    return playDataOne.createdAt - playDataTwo.createdAt;
  });


  const matchData = gamePlayedData.slice(0, 9).map((i, index) => {
    i["name"] = `Match ${index + 1}`
    return i
  });
  console.log(matchData)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={matchData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {
          graphType == "score" ? (<Bar dataKey="score" fill="#8884d8" />) : (<Bar dataKey="time" fill="#82ca9d" />)
        }
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ProfileChart;