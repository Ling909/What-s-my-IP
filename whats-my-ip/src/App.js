import Card from './View/Card.js'
import IPAddress from './Components/IPAdress.js'
require('dotenv').config()
function App() {
    return (
        <Card>
            <h1>Your IP Address is ...</h1>
            <IPAddress />
        </Card>
    )
}

export default App
