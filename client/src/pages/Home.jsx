import { getUser } from '../utils/auth';



function Home() {

  
  const user = getUser();
  if (user){

    return (
      <div className="home-container">
        <h1 className="home-title">Добродошли!</h1>
        <p className="home-subtext">
          Welcome to your Serbian language learning journey! Sign up or log in to get started with lessons and quizzes.
        </p>
      </div>
    )

  } else {
    return (
      <>  </>
    ) 
  }


  
}

export default Home;
