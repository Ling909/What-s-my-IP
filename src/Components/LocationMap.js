import React from "react";
import { Map, Marker } from "pigeon-maps";

export function LocationMap({lng, lat}) {
  return (
    <div className="map">
      <Map height={300} defaultCenter={[lat, lng]} defaultZoom={13}>
        <Marker width={50} anchor={[lat, lng]} />
      </Map>
    </div>
  )
}