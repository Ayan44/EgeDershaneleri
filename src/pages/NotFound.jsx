import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <main className="container page">
            <div className="pageContentAbout">
                <section className="not-found-hero">
                    <div className="not-found-hero__content">
                        <div className="not-found-hero__text">
                            <h1 className="not-found-hero__title">404</h1>
                            <h2 className="not-found-hero__subtitle">Page not found</h2>
                            <p className="not-found-hero__description">
                                The page you are looking for doesn't exist or has been moved.
                            </p>

                            <div className="not-found-hero__actions">
                                <Link to="/" className="btn btn--primary">
                                    Go back to Home
                                </Link>
                                <Link to="/contact" className="not-found-hero__contact-link">
                                    Contact us
                                </Link>
                            </div>
                        </div>

                        {/* Optional subtle illustration */}
                        <div className="not-found-hero__illustration" aria-hidden="true">
                            <svg
                                width="200"
                                height="200"
                                viewBox="0 0 200 200"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="not-found-illustration"
                            >
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    opacity="0.1"
                                    fill="none"
                                />
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="60"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    opacity="0.05"
                                    fill="none"
                                />
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="40"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    opacity="0.03"
                                    fill="none"
                                />
                                <path
                                    d="M70 100 L90 100 L85 85 L95 85 L100 100 L120 100"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    opacity="0.6"
                                />
                            </svg>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default NotFound
