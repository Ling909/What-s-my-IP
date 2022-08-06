import { useEffect, useState } from 'react';
import Loader from './Loader';
import { LocationMap } from './LocationMap.js';

const UserInfo = () => {
    const [userData, setUserData] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
        fetch('https://geo.ipify.org/api/v2/country,city?apiKey=' +  process.env.REACT_APP_ipify_KEY)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw Error('Failed to fetch IP');
                }
            })
            .then((data) => {
                console.log(data);
                setUserData(data);
                setIsLoading(true);
            })
            .catch((err) => console.log(err))
    }, [])
    return !isLoading ? (<Loader />): 
    (
        <>
            <div>
                <h2>{userData.ip}</h2>
                <p>Country: {userData.location.country}</p>
                <p>City: {userData.location.city}</p>
                <p>Region: {userData.location.region}</p>
                <p>Country {userData.location.country}</p>
                <p>ISP: {userData.location.isp}</p>
            </div>
            <LocationMap lng={userData.location.lng} lat={userData.location.lat} />
        </>
    )
}
export default UserInfo;