// HomeView.jsx  (SERVER COMPONENT)

import HomeViewClient from "./HomeViewClient";

export default function HomeView({ bigCard, smallCards }) {
  return (
    <div className="home-view">
      {/* Server se HTML turant render */}
      <HomeViewClient
        bigCard={bigCard}
        smallCards={smallCards}
      />
    </div>
  );
}
