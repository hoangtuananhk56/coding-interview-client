import './thank.scss';
import logo from '../../../assets/images/logo.png'
const Thank = () => {
    return (
        <div className='thank-screen '>
            <div className='company-logo'>
                <img src={logo} alt='company logo' />
            </div>
            <div className='thank-text'>
                <div className='text-1'>
                    Thanks for testing
                </div>
                <div className='text-2'>
                    We will call back when complete result!
                </div>
            </div>
        </div>
    );
}

export default Thank;