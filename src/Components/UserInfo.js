import { useEffect, useState } from 'react';
import Loader from './Loader';
import { LocationMap } from './LocationMap.js';
const { DateTime } = require("luxon");

const UserInfo = () => {
    const [userData, setUserData] = useState({})
    const [userCountryData, setUserCountryData] = useState([])
    const [isDataLoading, setIsDataLoading] = useState(true)
    const [isCountryDataLoading, setIsCountryDataLoading] = useState(true);
    let dt = DateTime.now().toLocaleString();

    useEffect(() => {
        readIps()
    }, [])

    useEffect(() => {
        if (!isDataLoading) readCountryData(userData.location.country)
    }, [userData])

    const readIps = async () => {
        fetch(
            'https://geo.ipify.org/api/v2/country,city?apiKey=' +
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
                console.log(data)
                setUserData(data)
                setIsDataLoading(false)
            })
            .catch((err) => console.log(err))
    }

    const readCountryData = async (code) => {
        fetch('https://restcountries.com/v3.1/alpha/' + code)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw Error('Failed to fetch IP')
                }
            })
            .then((data) => {
                console.log(data)
                setUserCountryData(data)
                setIsCountryDataLoading(false)
            })
            .catch((err) => console.log(err))
    }

    return isDataLoading || isCountryDataLoading ? (
        <Loader />
    ) : (
        <>
            <div className="table">
                <table>
                    <tbody>
                        <tr>
                            <td>{userData.ip}</td>
                            <td>
                                <img src={userCountryData[0].flags.png} />
                            </td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>{userCountryData[0].name.common}</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>{userData.location.city}</td>
                        </tr>
                        <tr>
                            <td>Region</td>
                            <td>{userData.location.region}</td>
                        </tr>
                        <tr>
                            <td>Country code</td>
                            <td>{userData.location.country}</td>
                        </tr>
                        <tr>
                            <td>ISP</td>
                            <td>{userData.isp}</td>
                        </tr>
                        <tr>
                            <td>Timezone</td>
                            <td>{userData.location.timezone}</td>
                        </tr>
                        <tr>
                            <td>Local date</td>
                            <td>{dt}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <LocationMap
                lng={userData.location.lng}
                lat={userData.location.lat}
                city={userData.location.city}
            />
        </>
    )
}
export default UserInfo
