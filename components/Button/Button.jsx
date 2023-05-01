const Button = ({ className, type, onClick, text }) => {
    return <button className={className} onClick={onClick} type={type}>{text}</button>
}

export default Button;