import React, { useEffect } from 'react';
import './Footer.css';

const Footer = () => {
    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector('footer');
            const windowHeight = window.innerHeight;
            const bodyHeight = document.body.offsetHeight;
            const footerHeight = footer.offsetHeight;

            if (windowHeight + window.pageYOffset >= bodyHeight - footerHeight) {
                footer.classList.add('visible');
            } else {
                footer.classList.remove('visible');
            }
        };

        // Attach event listener when component mounts
        document.addEventListener('scroll', handleScroll);

        // Detach event listener when component unmounts
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <main style={{ minHeight: '80vh' }}>
                {/* Main content goes here */}
            </main>
            <footer className="visible">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3 className="site_name" aria-level="2">
                                <a aria-current="page" className="" href="/">Office of Information Technology</a>
                            </h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="footer-contact col-md-4">
                            <p className="footer__address">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"></path>
                                </svg>
                                <span>300 Fuller Street</span>
                                <span>Durham, NC 27701</span>
                                <span>Internal: Duke Box 104100</span>
                            </p>
                            <p className="footer__phone">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
                                </svg>
                                <a href="tel:9196842200">(919) 684-2200</a>
                            </p>
                        </div>
                        <div className="col-md-4"></div>
                        <div className="footer__right col-lg-4">
                            <a href="mailto:help@duke.edu" className="button button--cta">
                                <span className="button__text button__text--cta">Report Website Issues</span>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="button__icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"></path>
                                </svg>
                            </a>
                            <div className="footer__social-icons-wrapper">
                                <a href="https://www.facebook.com/DukeUOIT/" aria-label="Facebook link" title="Facebook link">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22." />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="footer__login col-md-6">
                        <p>
                            <a href="https://oit.duke.edu/auth/cas/login?destination=node/10106" className="button button--cta" target="_blank">
                                <span className="button__text button__text--cta">Login</span>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="button__icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M13 7l-5 5 5 5V7z"></path>
                                </svg>
                            </a>
                        </p>
                    </div>
                </div>
                <p className="copyright__text">
                    &copy; 2024 Duke University | <a href="/privacy" target="_blank">Privacy Statement</a> | <a href="/website-accessibility" target="_blank">Accessibility</a> | <a href="/contact" target="_blank">Contact</a>
                </p>
            </footer>
        </div>
    );
};

export default Footer;



                      
          

