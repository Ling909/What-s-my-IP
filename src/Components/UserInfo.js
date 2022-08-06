import { useEffect, useState } from 'react';
import Loader from './Loader';
import { LocationMap } from './LocationMap.js';

const UserInfo = () => {
    const [userData, setUserData] = useState('');
    const [userCountryData, setUserCountryData] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
       readIps();
    }, []);

    useEffect(() => {
        if(!isLoading)
            readCountryData(userData.location.country);
     }, [userData]);

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
                setIsLoading(false);
            })
            .catch((err) => console.log(err))
    }

    const readCountryData = async (code) => {
        setIsLoading(true);
        fetch('https://restcountries.com/v3.1/alpha/' +  code)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw Error('Failed to fetch IP');
                }
            })
            .then((data) => {
                console.log(data);
                setUserCountryData(data);
            })
            .catch((err) => console.log(err))
        setIsLoading(false);
    }

    return isLoading ? (<Loader />): 
    (
        <>
            <div>
                <h2>{userData.ip}</h2>
                <p>Country: {userData.location.country}</p>
                <p>City: {userData.location.city}</p>
                <p>Region: {userData.location.region}</p>
                <p>Country: {userData.location.country}</p>
                <p>ISP: {userData.isp}</p>
            </div>
            <LocationMap lng={userData.location.lng} lat={userData.location.lat} city={userData.location.city}/>
        </>
    )
}
export default UserInfo;