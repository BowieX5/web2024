const RB = ReactBootstrap;
const { Alert, Card, Button, Table } = ReactBootstrap;

const firebaseConfig = {
  apiKey: "AIzaSyB6de8g7TueOcsoferobTyM-HX783RRYYc",
  authDomain: "web2567-d9c1d.firebaseapp.com",
  projectId: "web2567-d9c1d",
  storageBucket: "web2567-d9c1d.firebasestorage.app",
  messagingSenderId: "607315475541",
  appId: "1:607315475541:web:b87aae4f98b52a98c4a8dc",
  measurementId: "G-P62P3643CS"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

class App extends React.Component {
  title = (
    <Alert variant="info">
      <b>Work6 :</b> Firebase
    </Alert>
  );

  footer = (
    <div>
      By 663380142-3 กรองกาญจน์ ตรีเมฆ <br />
      College of Computing, Khon Kaen University
    </div>
  );

  state = {
    scene: 0,
  };

  componentDidMount() {
    // ดึงข้อมูลจาก Firebase
    const db = firebase.firestore();
    db.collection("student").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    });
  }

  render() {
    return (
      <Card>
        <Card.Header>{this.title}</Card.Header>
        <Card.Body></Card.Body>
        <Card.Footer>{this.footer}</Card.Footer>
      </Card>
    );
  }
}

const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);
