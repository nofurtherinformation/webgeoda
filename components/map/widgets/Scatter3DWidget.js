import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Widgets.module.css';
import DeckGL from '@deck.gl/react';
import {COORDINATE_SYSTEM, OrbitView} from '@deck.gl/core';
import {PointCloudLayer} from '@deck.gl/layers';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {WIDGET_WIDTH} from './Widget';

const DEFAULT_VIEW_STATE = {
  target: [0, 0, 0],
  rotationX: 0,
  rotationOrbit: 0,
  orbitAxis: 'Y',
  fov: 50,
  minZoom: 0,
  maxZoom: 10,
  zoom: 1
};

export const TARGET_RANGE = 100;

function Scatter3DWidgetUnwrapped(props) {
  const [viewState, setViewState] = useState(DEFAULT_VIEW_STATE);
  const mins = [0, 0, 0];
  const maxs = [100, 100, 100];
  const xTick = props.data.axesInfo[0].scalar * props.options.gridlinesInterval[0];
  const yTick = props.data.axesInfo[1].scalar * props.options.gridlinesInterval[1];
  const zTick = props.data.axesInfo[2].scalar * props.options.gridlinesInterval[2];
  const boxMesh = {
    positions: new Float32Array([
      0, 0, 0,
      xTick, 0, 0,
      xTick, yTick, 0,
      0, yTick, 0,
      0, yTick, zTick,
      xTick, yTick, zTick,
      xTick, 0, zTick,
      0, 0, zTick,
      0, 0, 0
    ])
  };


  const pointCloudLayer = new PointCloudLayer({
    id: "3d-scatter-layer",
    data: props.data.data,
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    getNormal: [0, 1, 0],
    getColor: [0, 0, 0], // TODO: parse and use foregroundColor
    opacity: 0.5,
    pointSize: 0.5
  });
  const gridlinesData = [];
  for(let x = 0; x <= TARGET_RANGE; x += xTick){
    for(let y = 0; y <= TARGET_RANGE; y += yTick){
      for(let z = 0; z <= TARGET_RANGE; z += zTick){
        gridlinesData.push({
          position: [x - props.data.axesInfo[0].min, y - props.data.axesInfo[1].min, z - props.data.axesInfo[2].min],
          angle: 0
        });
      }
    }
  }

  const gridlinesLayer = new SimpleMeshLayer({
    id: "gridlines",
    data: gridlinesData,
    mesh: boxMesh,
    getColor: [0, 0, 0, 10],
    wireframe: true
  });

  return (
    <div style={{height: "90%", position: "relative"}}>
      <DeckGL
        views={new OrbitView()}
        viewState={viewState}
        controller={true}
        onViewStateChange={newViewState => setViewState(newViewState.viewState)}
        layers={[pointCloudLayer, gridlinesLayer]}
      />
    </div>
  )
}

Scatter3DWidgetUnwrapped.propTypes = {
  options: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

const Scatter3DWidget = React.memo(Scatter3DWidgetUnwrapped);

export default Scatter3DWidget;