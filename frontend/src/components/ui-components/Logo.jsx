import PropTypes from 'prop-types'

const Logo = (props) => {
    const source = "https://api.freelogodesign.org/files/d27d3797c88a4d4e83db38e7a0455904/thumb/logo_200x200.png?v=637539197450000000"
    return <img className=" w-48" src={source} alt={"logo"}/>


}


export default Logo