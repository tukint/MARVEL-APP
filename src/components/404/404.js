import { NavLink } from 'react-router-dom';


const Page404 = () => {


    return (
        <div>
            <h1 style={{'text-align': 'center'}}>404</h1>
            <h1 style={{'text-align': 'center'}}>Page doesn't exist</h1>
            <h1 style={{'text-align': 'center', 'color': 'rgba(20, 41, 163)'}}>  <NavLink to="/"> Back to main page </NavLink></h1>
        </div>
    )
}
export default Page404;