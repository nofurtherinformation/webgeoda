import * as colors from "@webgeoda/utils/colors";
const data = [
  {
    name: 'Texas Block Groups', // Plain english name for dataset
    geodata: 'tx.geojson', // geospatial data to join to
    id: 'GEOID', // fid / geoid join column
    tables: {
      // any additional tabular data
      acs_data: {
        file: 'texas_acs.csv',
        type: 'characteristic',
        join: 'FIPS',
      },
      income_data: {
        file: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbtTg_m2TfwpmiZo7ylZKxt6cx79kny9plIqp4PSxUgnV6XvQBrTWcSPHH7b5_WE8IL1o_YJ95cOuJ/pub?output=csv',
        type:'characteristic',
        join: 'FIPS'
      },
      household_data: {
        file: 'texas_heating.csv',
        type:'characteristic',
        join: 'FIPS'
      },
    },
  },
  {
    name: 'US States', // Plain english name for dataset
    geodata: 'states.geojson', // geospatial data to join to
    id: 'GEOID', // fid / geoid join column
    tables: {
      // any additional tabular data
      acs_data: {
        file: 'texas_acs.csv',
        type: 'characteristic',
        join: 'FIPS',
      },
      household_data: {
        file: 'texas_heating.csv',
        type:'characteristic',
        join: 'FIPS'
      },
      covid_data: {
        file: 'nyt_covid_state.csv',
        type: 'time-series',
        join: 'fips',
      }
    },
  },
  {
    name: 'US States', // Plain english name for dataset
    geodata: 'states.geojson', // geospatial data to join to
    id: 'GEOID', // fid / geoid join column
    bounds: [-125.109215,-66.925621,25.043926,49.295128],
    tables: {
      acs_data: {
        file: 'state_acs.csv',
        type: 'characteristic',
        join: 'FIPS',
      },
      household_data: {
        file: 'texas_heating.csv',
        type:'characteristic',
        join: 'FIPS'
      },
      income_data: {
        file: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbtTg_m2TfwpmiZo7ylZKxt6cx79kny9plIqp4PSxUgnV6XvQBrTWcSPHH7b5_WE8IL1o_YJ95cOuJ/pub?output=csv',
        type:'characteristic',
        join: 'FIPS'
      },
      covid_data: {
        file: 'nyt_covid_state.csv',
        type: 'time-series',
        join: 'fips',
      }
    },
  },
  {
    name: 'US Tracts',
    geodata: 'US Tracts [tiles]',
    tiles: `csds-hiplab.3ezoql1c`,
    id: 'GEOID',
    bounds: [-125.109215,-66.925621,25.043926,49.295128],
    tables: {
      acs_data: {
        file: 'tract_acs.csv',
        type: 'characteristic',
        join: 'FIPS',
      }
    },
  }
];

const variables = [
  {
    variable: "Total Population",
    numerator: "acs_data",
    nProperty: "Total Population",
    binning: "naturalBreaks",
    numberOfBins: 8,
    colorScale: colors.colorbrewer.Greens,
  },
  {
    variable: "Hotspot: Total Population",
    numerator: "acs_data",
    nProperty: "Total Population",
    lisa: true
  },
  {
    variable: "Covid April",
    numerator: "covid_data",
    nIndex: null,
    nRange: 7,
    binning: "naturalBreaks",
    numberOfBins: 5,
    colorScale: colors.colorbrewer.YlOrBr,
  },
  {
    variable: "Median age",
    numerator: "properties",
    nProperty: "Median age",
    binning: "naturalBreaks",
    numberOfBins: 7,
    colorScale: colors.colorbrewer.Purples,
  },
  {
    variable: "Median Household Income",
    numerator: "income_data",
    nProperty: "Median Household Income",
    binning: "naturalBreaks",
    numberOfBins: 5,
    colorScale: colors.colorbrewer.YlGn,
  },
  {
    variable: "Median Gross Rent",
    numerator: "income_data",
    nProperty: "Median Gross Rent",
    binning: "hinge15Breaks",
    numberOfBins: 5,
    colorScale: colors.colorbrewer.YlOrRd,
  },
  {
    variable: "GEOID",
    numerator: "properties",
    nProperty: "GEOID",
    binning: "naturalBreaks",
    colorScale: colors.colorbrewer.Pastel2,
  },
  {
    variable: "Population Density",
    numerator: "acs_data",
    nProperty: "Total Population",
    denominator: "acs_data",
    dProperty: "Area Land",
    binning: "percentileBreaks",
    numberOfBins: 6,
    colorScale: colors.colorbrewer.Oranges,
  },
  {
    variable: "Count No Internet Access",
    numerator: "acs_data",
    nProperty: "No Internet Access",
    binning: "stddev_breaks",
    numberOfBins: 6,
    colorScale: colors.colorbrewer.Reds,
  },
  {
    variable: "Hotspot: Pct No Internet",
    numerator: "acs_data",
    nProperty: "No Internet Access",
    denominator: "acs_data",
    dProperty: "Internet Total",
    scale: 100,    
    lisa: true
  },
  {
    variable: "Most Common Heating Fuel",
    numerator: "household_data",
    nProperty: "Fuel Type",
    categorical: true,
    colorScale: colors.colorbrewer.Dark2,
  },
];

const mapModes = {
  "2D": true,
  "3D": false,
  BubbleCartogram: false,
};


const widgets = [
  // {
  //   display: "pinned",
  //   type: "histogram",
  //   variable: "Median age",
  //   options: {
  //     header: "Median Age",
  //     foregroundColor: "#FF00FF",
  //     yAxisLabel: "Median Age"
  //   }
  // },
  {
    display: "pinned",
    type: "histogram",
    variable: "Median Household Income",
    options: {
      header: "Median Household Income",
      foregroundColor: "#6932c2",
      yAxisLabel: "Median Household Income"
    }
  },
  {
    display: "pinned",
    type: "line",
    variable: "Covid April",
    options: {
      header: "COVID-19: April Data",
      foregroundColor: "#AAAA00",
      yAxisLabel: "Y Axis",
      dateFormat: "MM/DD/YYYY"
    }
  },
  // {
  //   display: "tray",
  //   type: "heatmap",
  //   xVariable: "Median Household Income",
  //   yVariable: "Median Gross Rent",
  //   options: {
  //     header: "Median Gross Rent vs Median Household Income",
  //     foregroundColor: "#000000",
  //     pointSize: .2,
  //     xAxisLabel: "Median Gross Rent",
  //     yAxisLabel: "Median Household Income",
  //     removeZeroValues: true
  //   }
  // },
  // {
  //   display: "hidden",
  //   type: "histogram",
  //   variable: "Median Household Income",
  //   options: {
  //     header: "Median Household Income",
  //     foregroundColor: "#FF00FF",
  //     yAxisLabel: "Median Household Income"
  //   }
  // },
  
  // {
  //   display: "tray",
  //   type: "lisaW",
  //   variable: "Total Population",
  //   options: {
  //     header: "Total Population LISA",
  //     foregroundColor: "#FF00FF",
  //   }
  // },
  // {
  //   display: "tray",
  //   type: "lisaScatter",
  //   variable: "Total Population",
  //   clusterFilter: "All",
  //   pValFilterL: 0,
  //   pValFilterU: 1,
  //   options: {
  //     header: "Total Population LISA Scatter",
  //     foregroundColor: "#000000",
  //     pointSize: .2,
  //     xAxisLabel: "Total Population",
  //     yAxisLabel: "Spatial Lag",
  //     removeZeroValues: true
  //   }
  // },
  {
    display: "pinned",
    type: "scatter",
    xVariable: "Median Household Income",
    yVariable: "Median Gross Rent",
    options: {
      header: "Household Income vs. Gross Rent",
      foregroundColor: "#000000",
      numClusters: 3,
      clusterColors: [
        "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"
      ],
      pointSize: .2,
      xAxisLabel: "Median Household Income",
      yAxisLabel: "Median Gross Rent",
      removeZeroValues: true
    }
  },
  {
    display: "tray",
    type: "scatter3d",
    xVariable: "Median Household Income",
    yVariable: "Median Gross Rent",
    zVariable: "Median age",
    options: {
      foregroundColor: "#00AAFF",
      xAxisLabel: "Median HH Income",
      yAxisLabel: "Median Gross Rent",
      zAxisLabel: "Median Age",
      gridlinesInterval: [100000, 500, 20]
    }
  }
];

// const style = {
//   mapboxStyle: 'mapbox://styles/dhalpern/ckpkalk6o2me517kvlgz1eo7r',
//   underLayerId: 'hillshade copy'
// }

// 🦺 exports below -- you can safely ignore! 🦺 //
export const dataPresets = {
  data,
  variables,
  mapModes,
  widgets,
  // style
};
