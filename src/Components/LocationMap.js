import React from "react";
import { Map, Marker, ZoomControl, Overlay } from "pigeon-maps";

export function LocationMap({lng, lat, city}) {
  return (
    <div className="map">
      <Map height={300} defaultCenter={[lat, lng]} defaultZoom={13}>
        <ZoomControl />
        <Marker width={50} anchor={[lat, lng]} />
        <Overlay anchor={[lat, lng]} offset={[40, 100]}>
          <div className="city">{city} &#128540;</div>
        </Overlay>
      </Map>
    </div>
  )
}