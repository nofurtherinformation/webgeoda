import React from 'react';
import PropTypes from 'prop-types';
import styles from './Widgets.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {shallowEqual} from '@webgeoda/utils/data';
import { updateLisaVariable } from '@webgeoda/utils/widgets';

const WIDGET_OPTION_TYPES = [
    {
        displayName: "Variable",
        datatype: "variable",
        supportedTypes: ["histogram", "summary"],
        get: (w) => w.variable,
        set: (w, v) => { w.variable = v , w.options.header = v}
    },
    {
        displayName: "LISA Variable",
        datatype: "lisaVariable",
        supportedTypes: ["lisaW", "lisaScatter"],
        get: (w) => w.variable,
        set: (w, v) => { w.variable = v , w.options.header = v + " LISA"},
        //setHeader: (w, v) => {w.options.header = v + " LISA"}
    },
    {
        displayName: "Cluster Type",
        datatype: "clusterVariable",
        supportedTypes: ["lisaScatter"],
        get: (w) => w.clusterFilter,
        set: (w, v) => { w.clusterFilter = v},
    },
    {
        displayName: "P-Value Lower Bound",
        datatype: "pValVar",
        supportedTypes: ["lisaScatter"],
        get: (w) => w.pValFilterL,
        set: (w, v) => { w.pValFilterL = v},
    },
    {
        displayName: "P-Value Upper Bound",
        datatype: "pValVar",
        supportedTypes: ["lisaScatter"],
        get: (w) => w.pValFilterU,
        set: (w, v) => { w.pValFilterU = v},
    },
    {
        displayName: "X Variable",
        datatype: "variable",
        supportedTypes: ["scatter", "scatter3d"],
        get: (w) => w.xVariable,
        set: (w, v) => { w.xVariable = v, w.options.xAxisLabel = v, w.options.header = w.yVariable + " vs " + v}
    },
    {
        displayName: "Y Variable",
        datatype: "variable",
        supportedTypes: ["scatter", "scatter3d"],
        get: (w) => w.yVariable,
        set: (w, v) => { w.yVariable = v, w.options.yAxisLabel = v, w.options.header = v + " vs " + w.xVariable}
    },
    {
        displayName: "Z Variable",
        datatype: "variable",
        supportedTypes: ["scatter3d"],
        get: (w) => w.zVariable,
        set: (w, v) => { w.zVariable = v ,w.options.zAxisLabel = v}
    },
    {
        displayName: "Header",
        datatype: "string",
        supportedTypes: ["line", "scatter3d"],
        get: (w) => w.options.header,
        set: (w, v) => { w.options.header = v }
    },
    {
        displayName: "Foreground Color",
        datatype: "color",
        supportedTypes: ["histogram", "line", "scatter", "scatter3d", "summary"],
        get: (w) => w.options.foregroundColor,
        set: (w, v) => { w.options.foregroundColor = v }
    },
    // {
    //     displayName: "X-Axis Label",
    //     datatype: "string",
    //     supportedTypes: ["histogram", "line", "scatter", "scatter3d"],
    //     get: (w) => w.options.xAxisLabel,
    //     set: (w, v) => { w.options.xAxisLabel = v }
    // },
    // {
    //     displayName: "Y-Axis Label",
    //     datatype: "string",
    //     supportedTypes: ["histogram", "line", "scatter", "scatter3d"],
    //     get: (w) => w.options.yAxisLabel,
    //     set: (w, v) => { w.options.yAxisLabel = v }
    // },
    // {
    //     displayName: "Z-Axis Label",
    //     datatype: "string",
    //     supportedTypes: ["scatter3d"],
    //     get: (w) => w.options.zAxisLabel,
    //     set: (w, v) => { w.options.zAxisLabel = v }
    // },
    {
        displayName: "Point Size",
        datatype: "number",
        supportedTypes: ["scatter", "scatter3d"],
        get: (w) => w.options.pointSize,
        set: (w, v) => { w.options.pointSize = v }
    },
]

function WidgetSettings(props){
    const dispatch = useDispatch();
    const variableConfig = useSelector(state => state.dataPresets.variables);
    const lisaVariable = useSelector(state => state.lisaVariable)
    const variableOptions = variableConfig.filter(config => config.categorical !== true).map(config => config.variable);
    const clusterOptions = ["All", "High-High", "Low-Low", "Low-High", "High-Low"]

    const [data, setData] = React.useState(props.config);
    const [doesWidgetNeedRefresh, setDoesWidgetNeedRefresh] = React.useState(false);

    const save = () => {
        if (!shallowEqual(props.config, data)){
            dispatch({
                type: "UPDATE_WIDGET_CONFIG_AND_DATA",
                payload: {
                    widgetIndex: props.id,
                    newConfig: data,
                    doesWidgetNeedRefresh
                }
            });
        }

        props.onSave();
    }

    const modifyData = (data, mutation, value) => {
        const newData = {...data}; // TODO: This only does a shallow clone
        mutation(newData, value);
        setData(newData);
    }

    // const modifyHeader = (data, mutation, value) => {
    //     const newData = {...data}; // TODO: This only does a shallow clone
    //     mutation(newData, value);
    //     setData(newData);
    // }

    const elems = WIDGET_OPTION_TYPES.filter(i => i.supportedTypes.includes(props.config.type)).map((i, idx) => {
        let elem = null;
        switch(i.datatype){
            case "variable": {
                elem = (
                    <select value={i.get(data)} onChange={(e) => {
                        modifyData(data, i.set, e.target.value);
                        setDoesWidgetNeedRefresh(true);
                    }}>
                        {
                            variableOptions.map(v => (
                                <option value={v} key={`variable-choice-${v}`}>{v}</option>
                            ))
                        }
                    </select>
                )
                break;
            }
            case "lisaVariable": {
                elem = (
                        <select value={lisaVariable} onChange={(e) => {
                        modifyData(data, i.set, e.target.value);
                        setDoesWidgetNeedRefresh(true);
                        updateLisaVariable(e.target.value, dispatch);
                        //modifyHeader(data, i.setHeader, lisaVariable);
                    }}>
                        {
                            variableOptions.map(v => (
                                <option value={v} key={`variable-choice-${v}`}>{v}</option>
                            ))
                        }
                    </select>
                )
                break;
            }
            case "clusterVariable": {
                elem = (
                        <select value={i.get(data)} onChange={(e) => {
                        modifyData(data, i.set, e.target.value);
                        setDoesWidgetNeedRefresh(true);
                        // modify filter
                    }}>
                        {
                            clusterOptions.map(v => (
                                <option value={v} key={`cluster-choice-${v}`}>{v}</option>
                            ))
                        }
                    </select>
                )
                break;
            }
            case "pValVar": {
                elem = <input type="number" step='0.0001' min='0' max='1' value={i.get(data)} onChange={(e) => {
                    modifyData(data, i.set, e.target.value);
                    setDoesWidgetNeedRefresh(true);
                }} />;
                break;
            }
            case "string": {
                elem = <input type="text" value={i.get(data)} onChange={(e) => modifyData(data, i.set, e.target.value)} />;
                break;
            }
            case "color": {
                elem = <input type="color" value={i.get(data)} onChange={(e) => modifyData(data, i.set, e.target.value)} />;
                break;
            }
            case "number": {
                elem = <input type="number" value={i.get(data)} onChange={(e) => modifyData(data, i.set, e.target.value)} />;
                break;
            }
        }
        return (
            <div className={styles.widgetSettingItem} key={`widgetsetting-${props.id}-${idx}`}>
                <p>{i.displayName}: {elem}</p>
            </div>
        );
    });
    return (
        <div>
            <h3 className={styles.widgetSettingsHeader}>Widget Options</h3>
            <div style={{height: "90%", overflowY: "auto"}}>
                {elems}
            </div>
            <button onClick={save}>Save</button>
        </div>
    );
}

WidgetSettings.propTypes = {
    config: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired
};

export default WidgetSettings;