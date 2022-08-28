import PropTypes from "prop-types"

// Need to pass in props to change the style
const Button = ({color, text, onClick}) => {
    return (
        <button onClick = {onClick}
                style = {{background:color}}
                className="btn">{text}
                </button>
    )
    
}

Button.defaultProps = {
    color: 'steelBlue',
}

//requirment
Button.protoTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button