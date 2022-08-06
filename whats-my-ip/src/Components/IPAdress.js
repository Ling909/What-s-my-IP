import { useEffect, useState } from 'react'

const IPAddress = () => {
    const [ipAddress, setIpAddress] = useState({})
    useEffect(() => {
        fetch('')
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw Error('Failed to fetch IP')
                }
            })
            .then((data) => {
                console.log(data)
                setIpAddress(data)
            })
            .catch((err) => console.log(err))
    }, [])
    return (
        <>
            <div>
                <h2>{ipAddress.query}</h2>
            </div>
        </>
    )
}
export default IPAddress
