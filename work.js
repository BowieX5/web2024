const RB = ReactBootstrap;
const { Alert, Card, Button } = ReactBootstrap;

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
  constructor() {
    super();
    this.state = {
      scene: 0,
      students: [],
      stdid: "",
      stdtitle: "",
      stdfname: "",
      stdlname: "",
      stdemail: "",
      stdphone: "",
      user: null, // เพิ่ม user สำหรับจัดการสถานะของผู้ใช้
    };

    // ฟังการเปลี่ยนแปลงของสถานะผู้ใช้
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() }); // แปลง user เป็น JSON และเก็บไว้ใน state
      } else {
        this.setState({ user: null });
      }
    });
  }

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

  // ฟังก์ชันสำหรับดึงข้อมูลจาก Firebase
  readData = () => {
    db.collection("students").get().then((querySnapshot) => {
      var stdlist = [];
      querySnapshot.forEach((doc) => {
        const studentData = doc.data();
        stdlist.push({
          id: doc.id,
          title: studentData.title,
          fname: studentData.fname,
          lname: studentData.lname,
          email: studentData.email,
          phone: studentData.phone,
        });
      });
      console.log(stdlist);
      this.setState({ students: stdlist });
    });
  };

  // ฟังก์ชันสำหรับ Auto Read แบบ Real-Time
  autoRead = () => {
    db.collection("students").onSnapshot((querySnapshot) => {
      var stdlist = [];
      querySnapshot.forEach((doc) => {
        const studentData = doc.data();
        stdlist.push({
          id: doc.id,
          title: studentData.title,
          fname: studentData.fname,
          lname: studentData.lname,
          email: studentData.email,
          phone: studentData.phone,
        });
      });
      console.log(stdlist);
      this.setState({ students: stdlist });
    });
  };

  // ฟังก์ชันสำหรับบันทึกข้อมูลนักเรียนใหม่
  insertData = () => {
    db.collection("students").doc(this.state.stdid).set({
      title: this.state.stdtitle,
      fname: this.state.stdfname,
      lname: this.state.stdlname,
      phone: this.state.stdphone,
      email: this.state.stdemail,
    });
  };

  // ฟังก์ชันสำหรับแก้ไขข้อมูลนักเรียน
  edit = (std) => {
    this.setState({
      stdid: std.id,
      stdtitle: std.title,
      stdfname: std.fname,
      stdlname: std.lname,
      stdemail: std.email,
      stdphone: std.phone,
    });
  };

  // ฟังก์ชันสำหรับลบข้อมูลนักเรียน
  delete = (std) => {
    if (window.confirm("ต้องการลบข้อมูลนี้ใช่ไหม?")) {
      db.collection("students").doc(std.id).delete();
    }
  };

  // ฟังก์ชันสำหรับเข้าสู่ระบบด้วย Google
  google_login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase.auth().signInWithPopup(provider);
  };

  // ฟังก์ชันสำหรับออกจากระบบ
  google_logout = () => {
    if (window.confirm("Are you sure?")) {
      firebase.auth().signOut();
    }
  };

  render() {
    return (
      <Card>
        <Card.Header>{this.title}</Card.Header>
        <LoginBox user={this.state.user} app={this} /> {/* ใช้ LoginBox */}
        <Card.Body>
          <Button onClick={() => this.readData()}>Read Data</Button>
          <Button onClick={() => this.autoRead()}>Auto Read</Button>
          <div>
            <StudentTable data={this.state.students} app={this} />
          </div>
        </Card.Body>
        <Card.Footer>
          <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</b><br />
          <TextInput label="ID" app={this} value="stdid" style={{ width: 120 }} />
          <TextInput label="คำนำหน้า" app={this} value="stdtitle" style={{ width: 100 }} />
          <TextInput label="ชื่อ" app={this} value="stdfname" style={{ width: 120 }} />
          <TextInput label="สกุล" app={this} value="stdlname" style={{ width: 120 }} />
          <TextInput label="Email" app={this} value="stdemail" style={{ width: 150 }} />
          <TextInput label="Phone" app={this} value="stdphone" style={{ width: 120 }} />
          <Button onClick={() => this.insertData()}>Save</Button>
        </Card.Footer>
        <Card.Footer>{this.footer}</Card.Footer>
      </Card>
    );
  }
}

// คอมโพเนนต์ TextInput สำหรับรับข้อมูลจากผู้ใช้
function TextInput({ label, app, value, style }) {
  return (
    <label className="form-label">
      {label}:{" "}
      <input
        className="form-control"
        style={style}
        value={app.state[value]}
        onChange={(ev) => {
          var s = {};
          s[value] = ev.target.value;
          app.setState(s);
        }}
      />
    </label>
  );
}

// คอมโพเนนต์ StudentTable สำหรับแสดงข้อมูลในรูปแบบตาราง
function StudentTable({ data, app }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>รหัส</th>
          <th>คำนำหน้า</th>
          <th>ชื่อ</th>
          <th>สกุล</th>
          <th>อีเมล</th>
          <th>เบอร์โทรศัพท์</th>
          <th>แก้ไข</th>
          <th>ลบ</th>
        </tr>
      </thead>
      <tbody>
        {data.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.title}</td>
            <td>{s.fname}</td>
            <td>{s.lname}</td>
            <td>{s.email}</td>
            <td>{s.phone}</td>
            <td><EditButton std={s} app={app} /></td>
            <td><DeleteButton std={s} app={app} /></td> {/* ปุ่มลบ */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// คอมโพเนนต์ EditButton สำหรับการแก้ไขข้อมูล
function EditButton({ std, app }) {
  return <button onClick={() => app.edit(std)}>แก้ไข</button>;
}

// คอมโพเนนต์ DeleteButton สำหรับการลบข้อมูล
function DeleteButton({ std, app }) {
  return <button onClick={() => app.delete(std)}>ลบ</button>;
}

// คอมโพเนนต์ LoginBox สำหรับการจัดการการเข้าสู่ระบบ
function LoginBox(props) {
  const u = props.user;
  const app = props.app;
  
  // หากผู้ใช้ยังไม่ได้เข้าสู่ระบบ
  if (!u) {
      return <div><Button onClick={() => app.google_login()}>Login</Button></div>
  } else {
      // หากผู้ใช้เข้าสู่ระบบแล้วแสดงรูปภาพของผู้ใช้และอีเมล
      return (
          <div>
              {/* ตรวจสอบว่าผู้ใช้มีรูปภาพหรือไม่ ก่อนที่จะแสดง */}
              {u.photoURL && <img src={u.photoURL} alt="User" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />}
              <span>{u.email}</span>
              <Button onClick={() => app.google_logout()}>Logout</Button>
          </div>
      );
  }
}


const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);
