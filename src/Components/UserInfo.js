import { useEffect, useState } from 'react';
import Loader from './Loader';
import { LocationMap } from './LocationMap.js';
const { DateTime } = require("luxon");

const UserInfo = () => {
    const [userData, setUserData] = useState({})
    const [userCountryData, setUserCountryData] = useState([])
    const [isDataLoading, setIsDataLoading] = useState(true)
    const [isCountryDataLoading, setIsCountryDataLoading] = useState(true);
    let dtlocal = DateTime.local(); 
    let dtlocalString = dtlocal.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    let zone = dtlocal.zoneName;

    useEffect(() => {
        readIps();
    }, [])

    useEffect(() => {
        if (!isDataLoading) 
            readCountryData(userData.location.country);
    }, [userData])

    const readIps = async () => {
        fetch('https://geo.ipify.org/api/v2/country,city?apiKey=' +  process.env.REACT_APP_ipify_KEY)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw Error('Failed to fetch IP');
            }
        })
        .then((data) => {
            //console.log(data);
            setUserData(data);
            setIsDataLoading(false);
        })
        .catch((err) => console.log(err))
    }

    const readCountryData = async (code) => {
        fetch('https://restcountries.com/v3.1/alpha/' + code)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw Error('Failed to fetch IP');
                }
            })
            .then((data) => {
                //console.log(data);
                setUserCountryData(data);
                setIsCountryDataLoading(false);
            })
            .catch((err) => console.log(err))
    }

    return isDataLoading || isCountryDataLoading ? (
        <Loader />
    ) : (
        <>
        <h1>Your IP Address is: {userData.ip}</h1>
            <div className="grid-container">
                <div className="grid-item">Flag</div>
                <div className="grid-item"><img src={userCountryData[0].flags.png} /></div>
                <div className="grid-item">Country</div>
                <div className="grid-item">{userCountryData[0].name.common}</div>
                <div className="grid-item">City</div>
                <div className="grid-item">{userData.location.city}</div>
                <div className="grid-item">Region</div>
                <div className="grid-item">{userData.location.region}</div>
                <div className="grid-item">Country code</div>
                <div className="grid-item">{userData.location.country}</div>
                <div className="grid-item">ISP</div>
                <div className="grid-item">{userData.isp}</div>
                <div className="grid-item">Timezone</div>
                <div className="grid-item">{userData.location.timezone}</div>
                <div className="grid-item">Local date and zone</div>
                <div className="grid-item">{dtlocalString}, {zone}</div>
            </div>
            <LocationMap
                lng={userData.location.lng}
                lat={userData.location.lat}
                city={userData.location.city}
            />
        </>
    )
}
export default UserInfo;