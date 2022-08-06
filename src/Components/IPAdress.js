import { useEffect, useState } from 'react'

const IPAddress = () => {
    const [ipAddress, setIpAddress] = useState({})

    useEffect(() => {
        console.log(process.env.REACT_APP_ipify_KEY)
        fetch(
            'https://geo.ipify.org/api/v2/country?apiKey=' +
                process.env.REACT_APP_ipify_KEY
        )
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw Error('Failed to fetch IP')
                }
            })
            .then((data) => {
                console.log(data.ip)
                setIpAddress(data.ip)
            })

            .catch((err) => console.log(err))
    }, [])
    return (
        <>
            <div>
                <h2>{ipAddress}</h2>
            </div>
        </>
    )
}
export default IPAddress
