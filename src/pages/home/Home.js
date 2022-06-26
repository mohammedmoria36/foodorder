import { useNavigate } from 'react-router-dom';
import Nav from '../nav/Nav';
import F1 from '../../shared/images/f1.jpg';
import F2 from '../../shared/images/f2.jpg';


function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="main-container">
                <Nav />
                <div className="container-fluid cm-cont-css first-container">
                    <h1 className="text-black mb-4">
                        Let's now shop for
                        For daily food
                        and necessary.
                    </h1>
                    <p className="text-black mb-5">We are trusted grocery shop you can buy
                        your necessary products use your phone.
                    </p>
                    <div className="header-btn">
                        <div className="container-fluid">
                            <div className="d-flex">
                                <button className="dark-btn me-2" onClick={() => navigate('/products')}>Buy Now</button>
                                <button className="light-btn">Download App</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cm-cont-css second-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className='cont-text-div'>
                                    <h2 className='mb-4'>Lorem Ipsum is simply dummy text of the printing. </h2>
                                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='cont-img-div'>
                                    <img src={F1} alt="ALT" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cm-cont-css third-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className='cont-img-div'>
                                    <img src={F2} alt="ALT" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='cont-text-div'>
                                    <h2 className='mb-4 text-black'>Lorem Ipsum is simply dummy</h2>
                                    <p className='text-black'>Contrary to popular belief, Lorem Ipsum is not simply random text. Classical Latin literature from 45 BC, making it over 2000 years old.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                        <p class="col-md-4 mb-0 text-muted">Foody © 2022 Company, Inc</p>

                        <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">

                        </a>

                        <ul class="nav col-md-4 justify-content-end">
                            <li class="nav-item"><a style={{cursor:'pointer'}} onClick={() => navigate('/')} class="nav-link px-2 text-muted">Home</a></li>
                            <li class="nav-item"><a style={{cursor:'pointer'}} onClick={() => navigate('/products')} class="nav-link px-2 text-muted">Products</a></li>
                        </ul>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Home;