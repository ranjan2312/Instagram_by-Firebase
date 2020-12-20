import React, { useState, useEffect } from 'react';
import Post from './Post';
import "./App.css"
import { db, auth } from "./firebase"
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Input } from "@material-ui/core"
import ImageUpload from './ImageUpload';



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setposts] = useState([]);
  const [open, setopen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);

      } else {
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }

  }, [user, username]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setposts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        })));
      })

  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));


    setopen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));



    setOpenSignIn(false);
  }

  return (




    <div className="app">



      <Modal
        open={open}
        onClose={() => setopen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_Singup">
            <center>
              <img className="app_headerImage"
                src="data:image/png;base64,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"
                alt="" />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signUp}>Sign Up</Button>

          </form>
        </div>
      </Modal>


      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_Singup">
            <center>
              <img className="app_headerImage"
                src="data:image/png;base64,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"
                alt="" />
            </center>

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn}>sign In</Button>

          </form>
        </div>
      </Modal>
      <div className="app_header">
        <img className="app_headerImage"
          src="data:image/png;base64,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"
          alt="" />
        {
          user ? (
            <Button onClick={() => auth.signOut()}>LogOut</Button>
          ) : (
              <div className="app_loginContainer">

                <Button onClick={() => setOpenSignIn(true)}>signIn</Button>

                <Button onClick={() => setopen(true)}>signUp</Button>
              </div>
            )
        }

      </div>
      <div className="app_posts">
        {
          posts.map(({ id, post }) => (
            <Post key={id} postId={id} user={user}
              username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
        }
      </div>




      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
          <h3>Sorry you have to Login To Upload</h3>
        )

      }
    </div>
  );
}

export default App;
