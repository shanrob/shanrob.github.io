
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


var title = d3.select(".talkvis").append("g")
                        .attr("transform", "translate(" + (talksto_width/2) + ", " + (talksto_width*.21) + ")")
                        .append("text")
                        .attr("id", "info")
                        .attr("text-anchor", "middle")
                        .text("Who talks to whom?")

var nodes = mygraph.nodes;
var links = mygraph.links
var leslie_links = links.filter(function(d) {
    return (d.season == "1" && d.episode == "1")
      // return (d.season == "1" && d.episode == "1" && d.source == "Leslie Knope");
})

var max = d3.max(links, function(d) { return d.strength})

var distanceScale = d3.scaleLinear()
                      .domain([0, 1])
                      .range([200, 0])


// .force("charge", d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
//     .force("collide", d3.forceCollide().strength(.1).radius(32).iterations(1)) 

var simulation = d3.forceSimulation(mygraph.nodes)
    .force("charge", d3.forceManyBody().strength(1))
    .force("collide", d3.forceCollide().strength(.4).radius(20).iterations(1))
    .force("link", d3.forceLink(leslie_links, function(d) {
        return d.source + "-" + d.target;
    }).id(function(d) { return d.id}).distance(function(d) {
        return distanceScale(d.strength);
      // return distanceScale(d.strength);
    }))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .alphaTarget(0)
    .on("tick", ticked);

var g = talksto_svg.append("g").attr("transform", "translate(" + talksto_width / 2 + "," + (talksto_height*.6) + ")"),
    link = g.append("g").attr("stroke", "#ccc").attr("stroke-width", 1.5).selectAll(".link"),
    node = g.append("g").attr("stroke-width", 1.5).selectAll(".node");

restart(leslie_links, "Leslie Knope");

function restart(newlinks, char) {

    // Apply the general update pattern to the nodes.
    node = node.data(mygraph.nodes, function(d) { return d.id;});
    node.exit().remove();
    node = node.enter().append("circle")
                    .attr("fill", function(d) { return colors[rename[d.id]]; })
                    .attr("r", 11)
                    .style("stroke", "white")
                    .on("mouseover", function(d) {
                        bar_info.transition()
                                .duration(300)
                                .style("opacity", 1);

                        bar_info.html(d.id)
                            .style("left", (d3.event.pageX + 10) + "px")     
                            .style("top", (d3.event.pageY + 10) + "px");
                    })
                    .on("mouseout", function(d) {
                        bar_info.style("opacity", 0)
                    })
                    .call(d3.drag()
                      .on("start", dragstarted)
                      .on("drag", dragged)
                      .on("end", dragended))
                                .merge(node)

    // Apply the general update pattern to the links.
    link = link.data(newlinks, function(d) { return d.source.id + "-" + d.target.id; });
    link.exit().remove();
    link = link.enter().append("line").merge(link);

    // Update and restart the simulation.
    simulation.nodes(mygraph.nodes);
    simulation.force("link").links(newlinks);
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

function updateNodes(input, season, episode, person) {

    if (person == "Leslie Knope") {
        var filteredlinks = input.filter(function(d) {
            return (d.season == season && d.episode == episode);
            // return (d.season == season && d.episode == episode && (d.source == person || d.target == person));
        })
    } else {
        person = (person.split(" "))[0];
        var filteredlinks = input.filter(function(d) {
            return (d.season == season && d.episode == episode);
            // return (d.season == season && d.episode == episode && (d.source == person || d.target == person));
        })
  }

  restart(filteredlinks, person);
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}