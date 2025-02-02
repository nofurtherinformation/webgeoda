import styles from "./MainMap.module.css";
import React, { useState, useCallback, useEffect, useRef } from "react";

// deck GL and helper function import
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import {MVTLayer} from '@deck.gl/geo-layers';
import {MapboxLayer} from '@deck.gl/mapbox';
import MapboxGLMap from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../layout/Loader";

import { useViewport, useSetViewport } from '@webgeoda/contexts';
import useLoadData from "@webgeoda/hooks/useLoadData";
import useUpdateMap from "@webgeoda/hooks/useUpdateMap";
// import useGetLisa from "../../_webgeoda/hooks/useGetLisa";
// import usePanMap from "@webgeoda/hooks/usePanMap";

import Legend from "./Legend";
import MapControls from "./MapControls";
import MapSelection from '../../components/map/MapSelection';
// import useGetVariable from "../../_webgeoda/hooks/useGetVariable";
import useBoxSelectFilter from "@webgeoda/hooks/useBoxSelectFilter";

export default function MainMap() {
  const initialViewState = useSelector((state) => state.initialViewState);
  const dataParams = useSelector((state) => state.dataParams);
  const mapParams = useSelector((state) => state.mapParams);
  const currentData = useSelector((state) => state.currentData);
  const cachedVariables = useSelector((state) => state.cachedVariables);
  const currentTiles = useSelector((state) => state.currentTiles);
  const currentId = useSelector((state) => state.currentId);
  const currentHoverId = useSelector((state) => state.currentHoverId);
  const storedGeojson = useSelector((state) => state.storedGeojson);
  const currentMapGeography = storedGeojson[currentData]?.data || [];
  const mapData = useSelector((state) => state.mapData);
  const mapStyle = useSelector((state) => state.mapStyle);
  const isLoading = useSelector((state) => state.isLoading);
  const mapFilters = useSelector((state) => state.mapFilters);
  const [glContext, setGLContext] = useState();
  const dispatch = useDispatch();
  // const panToGeoid = usePanMap();

  // eslint-disable-next-line no-empty-pattern
  const [] = useLoadData();
  // eslint-disable-next-line no-empty-pattern
  const [] = useUpdateMap();
  // eslint-disable-next-line no-empty-pattern
  const viewport = useViewport();
  // eslint-disable-next-line no-empty-pattern
  const setViewport = useSetViewport();
  const boxFilteredGeoids = useBoxSelectFilter();

  const deckRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    if (initialViewState.longitude)
      setViewport({
        longitude: initialViewState.longitude,
        latitude: initialViewState.latitude,
        zoom: initialViewState.zoom * 0.9,
      });
  }, [initialViewState]);

  // const handleMapClick = (e) => e.object && panToGeoid(e.object?.properties[currentId])

  const handleMapHover = (e) => {
    if (e.object) {
      dispatch({
        type: "SET_HOVER_OBJECT",
        payload: {
          id: e.object?.properties[currentId],
          layer: e.layer.id,
          x: e.x,
          y: e.y,
        },
      })
    } else {
      dispatch({
        type: 'SET_HOVER_OBJECT',
        payload: {
          id: null,
          x: null,
          y: null
        }
      })
    }
  };

  const onMapLoad = useCallback(() => {
    const map = mapRef.current.getMap();
    const deck = deckRef.current.deck;
    
    map.addLayer(
      new MapboxLayer({ id: "choropleth", deck }),
      mapStyle.underLayerId
    );
    map.addLayer(
      new MapboxLayer({ id: "tiles layer", deck }),
      mapStyle.underLayerId
    );
    map.addLayer(
      new MapboxLayer({ id: "choropleth-hover", deck })
    );
  }, []);
  // Apply map filters
  const itemIsInFilter = (id) => {
    // TODO: Instead of currentData, store `dataset` index with filter, use here
    const cachedData = cachedVariables[currentData];
    if (boxFilteredGeoids.length && !boxFilteredGeoids.includes(id)) return false;
    if(cachedData === null) return false;
    for(const filter of mapFilters){
      if(filter.type === "set"){
        if(!filter.values.includes(cachedData[filter.field][id])) return false;
      } else if(filter.type === "range"){
        const val = cachedData[filter.field][id];
        if(!(val >= filter.from && val <= filter.to)) return false;
      }
    }
    return true;
  }

  const layers = !mapData.params.includes(currentData)
    ? [new GeoJsonLayer({
      id: "choropleth",
      data: null
    })]
    : currentData.includes('tiles')
    ? [new MVTLayer({
        id: "tiles layer",
        // eslint-disable-next-line no-undef 
        data: `https://api.mapbox.com/v4/${currentTiles}/{z}/{x}/{y}.mvt?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
        getFillColor: (d) => mapData.data[d.properties[currentId]]?.color||[0,0,0,0],
        pickable: true,
        onHover: handleMapHover,
        updateTriggers: {
          getFillColor: mapData.params,
        },
      })]  
    : [
      new GeoJsonLayer({
        id: "choropleth",
        data: currentMapGeography,
        getFillColor: (d) => [
          ...(mapData.data[d.properties[currentId]]?.color||[0,0,0]),
          itemIsInFilter(d.properties[currentId])*255
        ],
        getLineColor: (d) => [
          0,
          0,
          0,
          255 * (+d.properties[currentId] === currentHoverId),
        ],
        // getElevation: d => currentMapData[d.properties.GEOID].height,
        pickable: true,
        stroked: true,
        filled: true,
        lineWidthScale: 1,
        lineWidthMinPixels: 1,
        getLineWidth: 5,
        // wireframe: mapParams.vizType === '3D',
        // extruded: mapParams.vizType === '3D',
        // opacity: mapParams.vizType === 'dotDensity' ? mapParams.dotDensityParams.backgroundTransparency : 0.8,
        material: false,
        onHover: handleMapHover,
        // onClick: handleMapClick,
        updateTriggers: {
          getFillColor: [mapData.params, mapFilters, boxFilteredGeoids.length],
          getLineColor: [mapData.params, currentHoverId]
        }
      })];

    // h
  return (
    <div className={styles.mapContainer}>
      
      {isLoading && <div className={styles.preLoader}><Loader globe={true} /></div>}
      <DeckGL
        layers={layers}
        ref={deckRef}
        initialViewState={viewport}
        controller={true}
        pickingRadius={20}
        onViewStateChange={({viewState}) => setViewport(viewState)}
        onWebGLInitialized={setGLContext}
        glOptions={{
          /* To render vector tile polygons correctly */
          stencil: true
        }}
      >
        <MapboxGLMap
          reuseMaps
          ref={mapRef}
          gl={glContext}
          mapStyle={mapStyle.mapboxStyle}
          preventStyleDiffing={true}
          onLoad={onMapLoad}
          // eslint-disable-next-line no-undef
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        ></MapboxGLMap>
      </DeckGL>
      <Legend
        bins={mapParams.bins.bins}
        colors={mapParams.colorScale}
        variableName={dataParams.variable}
        ordinal={dataParams.categorical||dataParams.lisa}
      />
      <MapControls
        deck={deckRef}
      />
      <MapSelection />
    </div>
  );
}
