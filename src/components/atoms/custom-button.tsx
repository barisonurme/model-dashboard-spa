import React from 'react'

// TODO Change this later with MUI Button
const CustomButton = (buttonProps: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button {...buttonProps}>CustomButton</button>
    )
}

export default CustomButton