import { Link, useNavigate } from 'react-router-dom';
import welcomeGif from './assets/react.svg';
import { signInWithGoogle } from './firebase.ts'; // මෙතනින් auth ඉවත් කරන්න

function Login() {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const token = await signInWithGoogle();
            localStorage.setItem('authToken', token); // ටෝකනය ලෝකල් ස්ටෝරේජ් එකේ සුරකින්න
            navigate('/taskworkface');
        } catch (error) {
            console.error("Google Sign-in Error:", error);
            alert("Failed to sign in with Google. Please try again.");
        }
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-light-blue font-sans">
            <div>
                <h1 className="text-4xl font-bold text-dark-blue mb-4">Welcome!</h1>
            </div>
            <div>
                <img src={welcomeGif} alt="Welcome Animation" className="mb-4" />
            </div>
            <p className="text-lg text-primary-blue text-center mb-6">
                මෙය ඔබගේ කාර්යයන් පහසුවෙන් කළමනාකරණය කර ගැනීමට උපකාර වන ටාස්ක් මැනේජ්මන්ට් ඇප් එකකි.
            </p>
            <div>
                <button
                    onClick={handleGoogleSignIn}
                    className="bg-white text-primary-blue font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50"
                >
                    <img src="https://img.icons8.com/color/32/000000/google-logo.png" alt="Google Sign-in" className="inline mr-2" />
                    Sign in with Google
                </button>
            </div>

            <footer className="mt-8">
                <p className="text-sm text-primary-blue">
                    Developed By: <Link to="https://www.linkedin.com/in/your-linkedin-profile/" target="_blank" rel="noopener noreferrer" className="underline hover:text-dark-blue">KPW</Link>
                </p>
            </footer>
        </div>
    );
}

export default Login;