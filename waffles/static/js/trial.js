
var rename = {
  "Leslie Knope":"Leslie Knope",
  "Tom": "Tom Haverford",
  "Ron": "Ron Swanson",
  "Ben": "Ben Wyatt",
  "Andy": "Andy Dwyer",
  "Ann": "Ann Perkins",
  "April": "April Ludgate",
  "Chris": "Chris Traeger",
  "Donna": "Donna Meagle",
  "Jerry": "Jerry Gergich",
}

// Set the stage
var talksto_width = $("#talksto").width();
var talksto_height = $("#talksto").height();

var talksto_svg = d3.select("#talksto").append("svg")
          .attr("class", "talkvis")
          .attr("width", talksto_width)
          .attr("height", talksto_height)


var nodes = mygraph.nodes;
var links = mygraph.links
var leslie_links = links.filter(function(d) {
      return (d.season == "1" && d.episode == "1" && d.source == "Leslie Knope");
})

var max = d3.max(links, function(d) { return d.strength})

var distanceScale = d3.scaleLinear()
                      .domain([0, 1])
                      .range([300, 5])

var simulation = d3.forceSimulation(mygraph.nodes)
    .force("charge", d3.forceManyBody().strength(-40))
    .force("link", d3.forceLink(leslie_links).id(function(d) { return d.id}).distance(function(d) {
      return distanceScale(d.strength);
    }))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .alphaTarget(1)
    .on("tick", ticked);

var g = talksto_svg.append("g").attr("transform", "translate(" + talksto_width / 2 + "," + talksto_height / 2 + ")"),
    link = g.append("g").attr("stroke", "#ccc").attr("stroke-width", 1.5).selectAll(".link"),
    node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll(".node");

restart(leslie_links, "Leslie Knope");


function restart(links, char) {

  // Apply the general update pattern to the nodes.
  node = node.data(mygraph.nodes, function(d) { return d.id;});
  node.exit().remove();
  node = node.enter().append("circle")
                    .attr("fill", function(d) { return colors[rename[d.id]]; })
                    .attr("r", 11).merge(node);

  // Apply the general update pattern to the links.
  link = link.data(links, function(d) { return d.source.id + "-" + d.target.id; });
  link.exit().remove();
  link = link.enter().append("line").merge(link);

  // Update and restart the simulation.
  simulation.nodes(mygraph.nodes);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();
}

function ticked() {
    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })

  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
}

function updateNodes(season, episode, person) {
    if (person == "Leslie Knope") {
        var newlinks = links.filter(function(d) {
            return (d.season == season && d.episode == episode && (d.source == person || d.target == person));
        })
    } else {
        person = (person.split(" "))[0];
        var newlinks = links.filter(function(d) {
              return (d.season == season && d.episode == episode && (d.source == person || d.target == person));
          })
  }
  console.log(newlinks)

  restart(newlinks, person);
}