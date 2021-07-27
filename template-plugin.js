import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Location from "../../IpfsLocation/location";
import { FlapperSpinner } from "react-spinners-kit";
const {create} = require("ipfs-http-client");
let ipfs = create("https://ipfs.infura.io:5001/");


const [PLUGINNAME] = ({ coin, address }) => {
  const [error, setError] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(false);

//THIS PLUGIN TAKES THE USER'S DEVICE LOCATION AND UPLOADS IT TO IPFS

  function beacon() {
    if (coin === true) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        setLocation(position);
        if (location !== null) {
          setShowLocation(true);
          setLoading(false);
        }
      })

      const saveBeaconToIpfs = async (position) => {
    try {
      const source = await ipfs.add([...position], {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      console.log(source);
      console.log(source.path);
      // setPhotoId(source.path);
      // setUpdating(false)
    } catch (e) {
      console.log(e);
    }
  };
    } else {
      setError(true);
    }
  }

// YOUR PLUGIN DOES SOMETHING: 
  return (
    <div id="camera-container">
      {error ? (
        <p>
          You need the [X NFT] to access this feature. Pick one up in the
          MarketPlace.
        </p>
      ) : (
        <div>
          {showLocation ? (
            <Location location={location} address={address} />
          ) : (
            <Button onClick={beacon}>Upload location</Button>
          )}
          {loading ? <FlapperSpinner /> : null}
        </div>
      )}
    </div>
  );
};

export default [PLUGIN NAME];
