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
var developCol = 1;
var featureCol = 0;

var gitgraph = new GitGraph(config);

var master = gitgraph.branch({name: "master", column: masterCol});
master.commit("Initial commit");

var develop = gitgraph.branch({parentBranch: master, name: "develop", column: developCol});
develop.commit({messageDisplay:false});

var featureBranch1 = gitgraph.branch({parentBranch:develop, name: "feature", column: featureCol});
featureBranch1.commit("Developer should fork the repo and submit feature branch pull requests against the original repo");
featureBranch1.commit({messageDisplay: false});
featureBranch1.commit({messageDisplay: false});

featureBranch1.merge(develop);

var nightly = gitgraph.branch({parentBranch: develop, name: "nightly", column: nightlyCol});

develop.merge(nightly, 'Jenkins merges `develop` into `nightly` at the end of every day');

var beta = gitgraph.branch({parentBranch: master, name: "beta", column: betaCol});

nightly.merge(beta, "Jenkins merges `nightly` into `beta` every week/sprint, and tells fastlane to generate builds for Testflight/Fabric");

beta.merge(master, "manual trigger to Jenkins merges `beta` into `master`");

master.commit({message:"Tag triggers release, Jenkins tells fastlane to generate builds for App/Play stores",tag:"v1.0.0",tagColor:'gray'});
