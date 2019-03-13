import React, { Component } from "react";
import randomColor from "randomcolor";
import TagCloud from "react-tag-cloud";
import CloudItem from "./CloudItem";

const styles = {
  large: {
    fontSize: 60,
    fontWeight: "bold"
  },
  small: {
    opacity: 0.7,
    fontSize: 16
  }
};

class App extends Component {
  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 3000);
  }

  render() {
    return (
      <div className="app-outer">
        <div className="app-inner">
          <h1>react-tag-cloud demo</h1>
          <TagCloud
            className="tag-cloud"
            rotate={() => Math.round(Math.random()) * 90}
            style={{
              fontFamily: "sans-serif",
              // fontSize: () => Math.round(Math.random() * 50) + 16,
              fontSize: 30,
              color: () =>
                randomColor({
                  hue: "blue"
                }),
              padding: 5
            }}
          >
            <div
              style={{
                fontFamily: "serif",
                fontSize: 40,
                fontStyle: "italic",
                fontWeight: "bold",
                color: randomColor()
              }}
            >
              Futurama
            </div>
            <CloudItem text="Custom item, Hover me!" />
            <CloudItem text="Custom item 2, Hover me!" />
            <div style={styles.large}>Transformers</div>
            <div style={styles.large}>Simpsons</div>
            <div style={styles.large}>Dragon Ball</div>
            <div style={styles.large}>Rick & Morty</div>
            <div style={{ fontFamily: "courier" }}>He man</div>
            <div style={{ fontSize: 30 }}>World trigger</div>
            <div style={{ fontStyle: "italic" }}>Avengers</div>
            <div style={{ fontWeight: 200 }}>Family Guy</div>
            <div style={{ color: "green" }}>American Dad</div>
            <div className="tag-item-wrapper">
              <div>Hover Me Please!</div>
              <div className="tag-item-tooltip">HOVERED!</div>
            </div>
            <div>Gobots</div>
            <div>Thundercats</div>
            <div>M.A.S.K.</div>
            <div>GI Joe</div>
            <div>Inspector Gadget</div>
            <div>Bugs Bunny</div>
            <div>Tom & Jerry</div>
            <div>Cowboy Bebop</div>
            <div>Evangelion</div>
            <div>Bleach</div>
            <div>GITS</div>
            <div>Pokemon</div>
            <div>She Ra</div>
            <div>Fullmetal Alchemist</div>
            <div>Gundam</div>
            <div>Uni Taisen</div>
            <div>Pinky and the Brain</div>
            <div>Bobs Burgers</div>
            <div style={styles.small}>Dino Riders</div>
            <div style={styles.small}>Silverhawks</div>
            <div style={styles.small}>Bravestar</div>
            <div style={styles.small}>Starcom</div>
            <div style={styles.small}>Cops</div>
            <div style={styles.small}>Alfred J. Kwak</div>
            <div style={styles.small}>Dr Snuggles</div>
          </TagCloud>
        </div>
      </div>
    );
  }
}

export default App;
