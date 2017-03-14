'use strict';

// these should go to the config
// var config = {
//     site_1_id:1,
//     node_start_x:200,
//     node_start_y:2000,
//     between_node_space_x:22,
//     between_node_space_y:20,
//     between_object_space_x:20,
//     between_object_space_y:3,
//     node_height:300,
//     onboard_port_shape:"circle",
//     onboard_port_radius:6,
//     slot_shape:"rectangle",
//     adapter_port_shape:"circle",
//     adapter_port_radius:"3",
//     number_of_nodes:24,
//     model_name:"FAS9000",
//     number_of_onboard_ports_used:6,
//     number_of_slots_filled:10,
//     number_of_adapter_ports_used:4,
// };


angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http) {
    var self = this;
    $http.get('schema_data_1.json').then(function(response) {
        self.schema_data = response.data;
        console.log(self);
      });

    $scope.test_x = config.between_node_space_x;
    $scope.all_label = true;
    $scope.labels = [];
    $scope.nodes = [];
    $scope.removeSchema= function(){
        d3.select("svg").selectAll("*").remove();
        d3.select("svg").remove();

    }
    $scope.drawSchema = function(){
        //svg.remove();
        //calculate width and height of the doc based on input.
        //
        $scope.removeSchema();
        var self =this;
        // Define the div for the tooltip
        var svgContainer = d3.select(".container").append("svg")
                                         .attr("width", 1000)
                                         .attr("height", 500);
        var div = d3.select("body").append("div")
                                             .attr("class", "tooltip")
                                             .style("opacity", 0);


        //Draw the Rectangle
        //svgContainer.call(zoom).on("zoom",zoomed));
        //var rectangle = svgContainer.append("rect")
        //                          .attr("x", 80)
        //                          .attr("y", 80)
        //                         .attr("width", 50)
        //                         .attr("fill-opacity",0.1)
        //                         .attr("height", 100);
        //                         //.attr("title", "rectangle");

        // var circle = svgContainer.append("circle")
        //                         .attr("cx",150)
        //                         .attr("cy", 150)
        //                         .attr("r",20);
        // var triangle = svgContainer.append("polygon")
        //                             .attr("points", "05,30 15,10 25, 30")
        // this is to create 4 rectangles
        var y_start = 80;
        for (var i=0, new_i=0; i<6; i++){
            var x_start = eval(80+new_i*210);
            console.log(new_i);
            console.log(x_start);
            if (80+new_i*210>600){
                console.log("here"+new_i);
                new_i = 0;
               y_start =y_start+120;
               x_start = eval(80+new_i*210);

            }

            new_i++;
            var  node_t = svgContainer.append("rect")
                                    .attr("x", x_start)
                                    .attr("y", y_start)
                                    .attr("width", 200)
                                    .attr("stroke-width", 5)
                                    .attr("stroke", "black")
                                    .attr("fill-opacity",0.1)
                                    .attr("height", 100);
                                    //.attr("title", "rectangle")
            var start_x = 80+parseInt(i*210);
            var start_y = y_start;
            var x_width =200;
            var x_height=100
            var int_start_x = parseInt($scope.test_x);
            var on_board_r = eval(config.onboard_port_radius*2);
            // console.log(on_board_r);
            for (var j=2; j<12; j=j+2){
                //var cxt = parseInt(parseInt(start_x+on_board_r*j)+int_start_x);
                var v=eval(on_board_r*j);
                self.j =j;
                var tmp=eval(x_start+v);
                // console.log(tmp);
                var cxt = eval(tmp+int_start_x);
                //console.log(typeof($scope.test_x));
                //console.log($scope.test_x);
                // console.log(cxt);
                // console.log(int_start_x);
                // console.log(config.onboard_port_radius);
                var cyt = parseInt(y_start+parseInt(config.onboard_port_radius)*2) + int_start_x;
                // console.log(cyt);
                var circle = svgContainer.append("circle")

                                        .attr("cx",cxt)
                                        .attr("cy", cyt)
                                        .attr("r",config.onboard_port_radius)
                                        .on("mouseover", function(d) {

                                                div.transition()
                                                .duration(200)
                                                .style("opacity", .9);
                                                div	.html( d+"text here <br/>"  )
                                                .style("left", (d3.event.pageX) + "px")
                                                .style("top", (d3.event.pageY - 28) + "px");
                                        })
                                        .on("mouseout", function(d) {
                                                div.transition()
                                                .duration(500)
                                                .style("opacity", 0);
                                        });
                start_x+= $scope.test_x;
            }
            $scope.nodes.push(node_t);
            var label = svgContainer.append("text")
                                    .attr("fill","black")
                                    .attr("text-anchor","end")
                                    .attr("x",cxt+20)
                                    .attr("y" , cyt+50)
                                    .attr("dy", ".35em")
                                    .text("#"+i);
            $scope.labels.push(label);
        }
    }
    $scope.drawSchema();
    $scope.switch_label = function (){
        if (!$scope.all_label){
            //$scope.all_label = false;
            for(var i=0; i<$scope.labels.length;i++){
                // console.log($scope.labels[i]);
                $scope.labels[i].text("");
            }
        }
        else {
            console.log("HERE 2");
            for(var i=0; i<$scope.labels.length;i++){
                console.log($scope.labels[i]);
                $scope.labels[i].text("#"+i);
            }
            //$scope.all_label = true;
        }
    }
    if (!$scope.all_label){
        for(var i=1; i<$scope.all_label.length+1;i++){
            all_label[i].text("ok");
        }
    }
});
