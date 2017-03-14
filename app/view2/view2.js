'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', function($scope, $http) {
    var self = this;
    $http.get('schema_data.json').then(function(response) {

        self.schema_data = response.data;
        //console.log(self.schema_data.data);
        $scope.drawSchema(self.schema_data)
        //console.log(self.schema_data);
      });
    $scope.removeSchema= function(){
          d3.select("svg").selectAll("*").remove();
          d3.select("svg").remove();
      }
    $scope.drawSchema = function(schema){

          //svg.remove();
          //calculate width and height of the doc based on input.
          //
          $scope.removeSchema();
          console.log(schema);
          var ports =schema.data[0].site.Nodes.OnBoardPorts;
          console.log(ports);
          var da =$scope.schema_data;
          //console.log($scope.schema_data.schema_data);
          var svgContainer = d3.select(".container").append("svg")
                                           .attr("width", 1000)
                                           .attr("height", 500);
          var div = d3.select("body").append("div")
                                               .attr("class", "tooltip")
                                               .style("opacity", 0);
          var main_site = svgContainer.selectAll("svg")
                            .data(schema.data)
                            .enter()
                            .append("svg:rect")
                            .attr("x", 0)
                            .attr("y", 0)
                            .attr("fill-opacity",0.1)
                            .attr("height", 500)
                            .attr("width","900")
                            .attr("stroke-width", 2)
                            .attr("stroke", "black")
                            .on("mouseover", function(d) {

                                    div.transition()
                                   .duration(200)
                                   .style("opacity", .9);
                                    div.html( d.PopupLabel.OSReleaseStatus  )
                                   .style("left", (d3.event.pageX) + "px")
                                   .style("top", (d3.event.pageY - 28) + "px");
                           })
                           .on("mouseout", function(d) {
                                    div.transition()
                                   .duration(500)
                                   .style("opacity", 0);
                           });
          var nodes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
          var rectangle_sites = svgContainer.selectAll("svg")
                                 .data (nodes)
                                 .enter()
                                 .append("svg:rect")
                                 .attr("x", function (d) { //console.log(d);
                                         //console.log("d is "+d+" and _.max si "+_.max([0,1]);
                                         return (d-Math.floor(d/10)*9)  ? ((d-Math.floor(d/10)*9 )) *80 : 80 ;
                                         //return _.max((d-Math.floor(d/10)*10) * 80, 80);

                                })
                                 .attr("y", function (d){
                                     return 80+ Math.floor(d/10)*100;
                                 })
                                 .attr("width", 70)
                                 .attr("fill-opacity",0.1)
                                 .attr("height", 100)
                                 .attr("stroke-width", 2)
                                 .attr("stroke", "black")
                                 .on("mouseover", function(d) {

                                         div.transition()
                                        .duration(200)
                                        .style("opacity", .9);
                                         div.html( d+" text here <br/>"  )
                                        .style("left", (d3.event.pageX) + "px")
                                        .style("top", (d3.event.pageY - 28) + "px");
                                })
                                .on("mouseout", function(d) {
                                         div.transition()
                                        .duration(500)
                                        .style("opacity", 0);
                                });
                                //.attr("title", "rectangle");
        for (var i=1;i<=nodes.length;i++){

            var start_x = i*80
            var start_y = 80
            if(i>9){
                var new_i=i-9;
                 start_x=(i-Math.floor(i/10)*9) * 80;
                //start_x = new_i*80;
                console.log(i);
                console.log(Math.floor(i/9));

                start_y = start_y + Math.floor(i/10)*100;
            }
            var rectangle_ports = svgContainer.selectAll("svg")
                                .data([1,2,3,4,5,6,7])
                                .enter()
                                .append("svg:rect")
                                .attr("x", function (d) { //console.log(d);
                                                       return start_x+8*d})
                                .attr("y", start_y+config.between_object_space_y)
                                .attr("width", 6)
                                .attr("fill-opacity",0.6)
                                .attr("height", 6)
                                .on("mouseover", function(d) {

                                        div.transition()
                                       .duration(200)
                                       .style("opacity", .9);
                                        div.html( " portno <br/>"+d  )
                                       .style("left", (d3.event.pageX) + "px")
                                       .style("top", (d3.event.pageY - 28) + "px");
                               })
                               .on("mouseout", function(d) {
                                        div.transition()
                                       .duration(500)
                                       .style("opacity", 0);
                               });
            var circular_ports =  svgContainer.selectAll("svg")
                                .data(ports)
                                .enter()
                                .append("svg:circle")
                                .attr("cx", function (d) {
                                    console.log(d);
                                    return start_x+eval(d.id)*(config.onboard_port_radius+config.between_object_space_y+5)})
                                .attr("cy", start_y+15+config.between_object_space_y)
                                .attr("r", config.onboard_port_radius)
                                .attr("fill-opacity",0.6)
                                .attr("fill",function(d){return d.Color})
                                .on("mouseover", function(d) {

                                        div.transition()
                                       .duration(200)
                                       .style("opacity", .9);
                                        div.html( d.PopUpLabel.PortType )
                                       .style("left", (d3.event.pageX) + "px")
                                       .style("top", (d3.event.pageY - 28) + "px");
                               })
                               .on("mouseout", function(d) {
                                        div.transition()
                                       .duration(500)
                                       .style("opacity", 0);
                               });
        }

      }
      //$scope.drawSchema();

});
