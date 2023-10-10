import './App.css';
import AppRoot from './app-root/AppRoot';
import Auth from './auth/Auth';
import LoginWithGoogle from './auth/LoginWithGoogle';
import LoginWithFaceBook from './auth/LoginWithFaceBook';
import ChatApp from './chat-app/ChatApp';
import CRUD from './crud/CRUD';
import Root from './expense/pages/Root';
import UploadImage from './uploadImage/UploadImage';

function App() {
  return (
    <div>
     {/* <CRUD/> */}
     {/* <Auth/> */}
     {/* <LoginWithGoogle/> */}
     {/* <AppRoot/> */}
     {/* <UploadImage/> */}
     {/* <ChatApp/> */}
     <Root/>
     {/* <LoginWithFaceBook/> */}
    </div>
  );
}

export default App;
