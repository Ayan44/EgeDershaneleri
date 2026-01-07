import { Link } from 'react-router-dom'

function Breadcrumb({ items }) {
    if (!items || items.length === 0) {
        return null
    }

    return (
        <div className="page__breadcrumb">
            {items.map((item, index) => (
                <span key={index}>
                    {item.href ? (
                        <Link to={item.href}>{item.label}</Link>
                    ) : (
                        <span>{item.label}</span>
                    )}
                    {index < items.length - 1 && <span>›</span>}
                </span>
            ))}
        </div>
    )
}

export default Breadcrumb
