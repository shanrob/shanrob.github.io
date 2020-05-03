
// rename function to handle Tania's data
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

// Calculates distance between character nodes for link length
var distanceScale = d3.scaleLinear()
                      .domain([0, 1])
                      .range([150, 5])

// Start with all the nodes and links from the data
var anodes = mygraph.nodes;
var links = mygraph.links;

// // Filter data for Leslie, s1, e1, for initial state
var leslie_links = links.filter(function(d) {
      return (d.season == "1" && d.episode == "1" && d.source == "Leslie Knope");
})


var simulation = d3.forceSimulation()
//         .force("charge", d3.forceManyBody().strength(-100))
//         .force("link", d3.forceLink().id(d=>d.id).distance(200))
//         .force("x", d3.forceX())
//         .force("y", d3.forceY())
//         .on("tick", ticked);

simulation.force("link", d3.forceLink().distance(function(d) {
          return distanceScale(d.strength);
    }).id(function(d) { 
        return d.id; 
    }))
    .force("charge", d3.forceManyBody().strength(-10))
    .force("center", d3.forceCenter(talksto_width/2, talksto_height / 2));

// var simulation = d3.forceSimulation(anodes)
//     .force("charge", d3.forceManyBody().strength(-100))
//     .force("link", d3.forceLink(leslie_links, function(d) {
//         console.log(d)
//         return d.id;
//     }).distance(200))
//     .force("x", d3.forceX())
//     .force("y", d3.forceY())
//     .alphaTarget(1)
//     .on("tick", ticked);

    // var g = talksto_svg.append("g").attr("transform", "translate(" + talksto_width / 2 + "," + talksto_height / 2 + ")"),
    //     link = talksto_svg.append("g").attr("stroke", "#000").attr("stroke-width", 1.5).selectAll(".link"),
    //     node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll(".node");

    // update(anodes, leslie_links, "1", "1", "Leslie Knope")

var link = talksto_svg.append("g")
          .attr("class", "links")
            .attr("stroke", "#ccc")
            .attr("stroke-width", 2)
            .selectAll("line")
            .data(leslie_links, function(d) { 
                // console.log(d.source + "-" + d.target)
                return d.source + "-" + d.target; 
            })
            .enter().append("line")
              .attr("stroke", "#ccc")
              .attr("stroke-width", 2);

// let node = talksto_svg.append("g")
//                     .attr("stroke", "white")
//                     .attr("stroke-width", 1)
//                     .selectAll("circle")

var node = talksto_svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
                .data(anodes, function(d) {
                  return d.id;
                })
                .enter().append("g")

    node.append("circle")
                    .attr("r", function(d) { return 10;})
                    .attr("fill", function(d) {return colors[rename[d.id]]})
                    .attr("stroke", "white")

simulation
    .nodes(anodes)
    .on("tick", ticked)

simulation.force("link")
    .links(leslie_links);



function update(newnodes, newlinks, newseason, newepisode, newcharacter) {

    // console.log(newnodes)
    // console.log(newlinks)

    // nodes = d3.select(".nodes").selectAll("g")
    //                     .data(newnodes, function(d) {
    //                         return d.id;
    //                     })

    //     nodes.enter()
    //             .append("g")
    //                 .append("circle")
    //                 .attr("r", function(d) { return 10;})
    //                 .attr("fill", function(d) {return colors[rename[d.id]]})
    //                 .attr("stroke", "white")

    //     nodes.exit().remove();
    node = node.data(newnodes, function(d) { return d.id;});
    node.exit().remove();
    node = node.enter().append("circle").attr("fill", function(d) { return colors[rename[d.id]]; }).attr("r", 10).merge(node);

    link = link.data(newlinks, function(d) { return d.source.id + "-" + d.target.id; });
    link.exit().remove();
    link = link.enter().append("line").merge(link);



    // node = node.data(newnodes, function(d) {
    //     return d.id;
    // })
    // .merge(enter => enter.append("circle")
    //                         .attr("r", 10)
    //                         .attr("fill", function(d) {
    //                             return colors[rename[d.id]]
    //                         })
    //                         .attr("stroke", "white"))

    // link = link.data(newlinks, function(d) {
    //     return d.source + "-" + d.target;
    // }).merge("line").attr("stroke", "#ccc")
    //                 .attr("stroke-width", 2)
    // links = d3.select(".links").selectAll("line")
    //                     .data(newlinks, function(d) {
    //                         console.log(d.source + "-" + d.target)
    //                         return d.source + "-" + d.target;
    //                     })

    //     links.enter()
    //             .append("line")
    //                 .attr("class", function(d) {
    //                     return d.source + "-" + d.target;
    //                 })
    //               .attr("stroke", "#ccc")
    //               .attr("stroke-width", 2);

    //     links.exit().remove();

    // simulation
    //     .nodes(newnodes)
    //     .on("tick", reticked)

    // simulation.force("link")
    //     .links(newlinks);

// update(anodes, leslie_links, "1", "1", firstname)

}

$(".mug").on("click", function(d) {

    var name = this.id;
    var names = name.split(" ");
    var firstname = names[0];

    var gnodes = mygraph.nodes;
    var glinks = mygraph.links;

    var flinks = glinks.filter(function(d) {
        return (d.season == "1" && d.episode == "1" && (d.source == firstname));
    })


    update(gnodes, flinks, "1", "1", firstname)

})


function ticked() {

    link
    .attr("x1", function(d) { 
        return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

    node
        .attr("transform", function(d) {
          return "translate(" + (d.x) + "," + (d.y) + ")";
        })
  }

function reticked() {

    links
    .attr("x1", function(d) { 
        console.log(d)
        return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

    nodes
        .attr("transform", function(d) {
          return "translate(" + (d.x) + "," + (d.y) + ")";
        })
  }

