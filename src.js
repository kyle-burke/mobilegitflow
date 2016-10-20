var graphConfig = new GitGraph.Template({
  branch: {
    color: "#000000",
    lineWidth: 3,
    spacingX: 60,
    mergeStyle: "straight",
    showLabel: true,                // display branch names on graph
    labelFont: "normal 10pt Arial"
  },
  commit: {
    spacingY: -30,
    dot: {
      size: 8,
      strokeColor: "#000000",
      strokeWidth: 4
    },
    tag: {
      font: "normal 10pt Arial",
      color: "yellow"
    },
    message: {
      color: "black",
      font: "normal 12pt Arial",
      displayAuthor: false,
      displayBranch: false,
      displayHash: false,
    }
  },
  arrow: {
    size: 8,
    offset: 3
  }
});

var config = {
  template: graphConfig,
  mode: "extended",
  orientation: "vertical"
};

var masterCol = 4;
var betaCol = 3;
var nightlyCol = 2;
var developmentCol = 1;
var featureCol = 0;

var gitgraph = new GitGraph(config);

var master = gitgraph.branch({name:"master", column:masterCol});
master.commit("Initial commit");
