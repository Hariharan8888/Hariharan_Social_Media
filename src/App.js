import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import Newpost from "./Newpost";
import PostPage from "./Postpage";
import { Route, Routes} from "react-router-dom";
import EditPost from "./EditPost";
import {DataProvider} from "./Context/DataContext";


function App(){
    return(
       <div className="App">
        <DataProvider>
            <Header title="Hariharan Social Media"/>
            <Nav />
            <Routes>
               <Route path="/" element={<Home />} />
                <Route path="post">
                <Route index element={<Newpost />} />
                <Route path=":id" element={<PostPage />}/>
                </Route>
                <Route path="/edit/:id" element={
                <EditPost />} /> 
                <Route path="about" element={<About/>} />
                <Route path="*" element={<Missing/>} />
                </Routes> 
            
            <Footer /> 
            </DataProvider>

       </div >
    )
}


export default App;
