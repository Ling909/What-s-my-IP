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
                <h4>{userData.location.country}</h4>
                <h4>{userData.location.region}</h4>
                <h4>{userData.location.timezone}</h4>
            </div>
            <LocationMap lng={userData.location.lng} lat={userData.location.lat} />
        </>
    )
}
export default UserInfo;